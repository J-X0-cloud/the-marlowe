import { isWeekendNight, nightsBetween, stayNights } from "@/lib/dates";
import { offerCodes, roomTypes } from "@/lib/data/rooms";
import type { AvailabilityQuery } from "@/lib/validation/availability";
import type { RoomType } from "@/types/hotel";

export type NightlyRate = { date: string; rate: number; weekend: boolean };

export type RoomQuote = {
  slug: string;
  name: string;
  sleeps: number;
  roomsLeft: number;
  nights: NightlyRate[];
  subtotal: number;
  discount: number;
  total: number;
  averageNightly: number;
};

export type AppliedOffer = { code: string; label: string; percentOff: number };

export type AvailabilityResult = {
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  offer: AppliedOffer | null;
  offerMessage: string | null;
  available: RoomQuote[];
  /** Room types that exist but are full or too small for the party. */
  unavailable: { slug: string; name: string; reason: "sold-out" | "too-small" }[];
};

/** Where room counts come from. The PMS in production, a local model otherwise. */
export interface InventorySource {
  roomsBooked(roomSlug: string, nights: string[]): Promise<number[]>;
}

/** Calls the property management system's inventory endpoint. */
class PmsInventory implements InventorySource {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
  ) {}

  async roomsBooked(roomSlug: string, nights: string[]): Promise<number[]> {
    const url = new URL(`/inventory/${roomSlug}`, this.baseUrl);
    url.searchParams.set("nights", nights.join(","));
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`PMS inventory request failed: ${response.status}`);
    const body = (await response.json()) as { booked: number[] };
    return body.booked;
  }
}

/**
 * Deterministic occupancy model used in development and previews: weekends run fuller than
 * midweek, and the same night always returns the same answer so the UI is predictable.
 */
class ModelInventory implements InventorySource {
  async roomsBooked(roomSlug: string, nights: string[]): Promise<number[]> {
    const room = roomTypes.find((r) => r.slug === roomSlug);
    if (!room) return nights.map(() => 0);
    return nights.map((night) => {
      const load = isWeekendNight(night) ? 0.75 : 0.45;
      const jitter = (hash(`${roomSlug}:${night}`) % 100) / 100 - 0.5;
      return Math.min(room.inventory, Math.max(0, Math.round(room.inventory * (load + jitter * 0.5))));
    });
  }
}

function hash(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const inventory: InventorySource =
  process.env.PMS_API_URL && process.env.PMS_API_KEY
    ? new PmsInventory(process.env.PMS_API_URL, process.env.PMS_API_KEY)
    : new ModelInventory();

export function nightlyRates(room: RoomType, nights: string[]): NightlyRate[] {
  return nights.map((date) => {
    const weekend = isWeekendNight(date);
    const rate = weekend ? Math.round(room.fromRate * room.weekendMultiplier) : room.fromRate;
    return { date, rate, weekend };
  });
}

function resolveOffer(code: string | undefined, nights: number) {
  if (!code) return { offer: null, message: null };
  const offer = offerCodes[code];
  if (!offer) return { offer: null, message: `We don’t recognise the code ${code}.` };
  if (offer.minNights && nights < offer.minNights) {
    return { offer: null, message: `${code} applies to stays of ${offer.minNights} nights or more.` };
  }
  return { offer: { code, label: offer.label, percentOff: offer.percentOff }, message: null };
}

export async function checkAvailability(query: AvailabilityQuery): Promise<AvailabilityResult> {
  const nights = stayNights(query.checkIn, query.checkOut);
  const { offer, message } = resolveOffer(query.code, nights.length);
  const candidates =
    query.room === "any" ? roomTypes : roomTypes.filter((room) => room.slug === query.room);

  const result: AvailabilityResult = {
    checkIn: query.checkIn,
    checkOut: query.checkOut,
    nights: nightsBetween(query.checkIn, query.checkOut),
    guests: query.guests,
    offer,
    offerMessage: message,
    available: [],
    unavailable: [],
  };

  for (const room of candidates) {
    if (room.sleeps < query.guests) {
      result.unavailable.push({ slug: room.slug, name: room.name, reason: "too-small" });
      continue;
    }

    const booked = await inventory.roomsBooked(room.slug, nights);
    const roomsLeft = Math.min(...booked.map((count) => room.inventory - count));
    if (roomsLeft <= 0) {
      result.unavailable.push({ slug: room.slug, name: room.name, reason: "sold-out" });
      continue;
    }

    const rates = nightlyRates(room, nights);
    const subtotal = rates.reduce((sum, night) => sum + night.rate, 0);
    const discount = offer ? Math.round(subtotal * offer.percentOff) / 100 : 0;
    const total = subtotal - discount;

    result.available.push({
      slug: room.slug,
      name: room.name,
      sleeps: room.sleeps,
      roomsLeft,
      nights: rates,
      subtotal,
      discount,
      total,
      averageNightly: Math.round(total / rates.length),
    });
  }

  result.available.sort((a, b) => a.total - b.total);
  return result;
}
