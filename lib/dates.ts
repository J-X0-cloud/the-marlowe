export const HOTEL_TIME_ZONE = "America/Los_Angeles";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const isISODate = (value: string) => ISO_DATE.test(value);

/** Parses "YYYY-MM-DD" as a calendar date at local midnight (no UTC shift). */
export function parseISODate(isoDate: string): Date {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(isoDate: string, days: number): string {
  const date = parseISODate(isoDate);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

/** Whole nights between check-in and check-out. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  const ms = parseISODate(checkOut).getTime() - parseISODate(checkIn).getTime();
  return Math.round(ms / 86_400_000);
}

/** Each night of a stay, as the ISO date the night starts on. */
export function stayNights(checkIn: string, checkOut: string): string[] {
  return Array.from({ length: nightsBetween(checkIn, checkOut) }, (_, i) => addDays(checkIn, i));
}

export function isWeekendNight(isoDate: string): boolean {
  const day = parseISODate(isoDate).getDay();
  return day === 5 || day === 6;
}

export function todayInSanDiego(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: HOTEL_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Default stay shown in the booking widgets: the coming Friday for two nights. */
export function defaultStay(today = todayInSanDiego()): { checkIn: string; checkOut: string } {
  const day = parseISODate(today).getDay();
  const untilFriday = (5 - day + 7) % 7 || 7;
  const checkIn = addDays(today, untilFriday);
  return { checkIn, checkOut: addDays(checkIn, 2) };
}

export function formatShortDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(
    parseISODate(isoDate),
  );
}

export function formatLongDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(
    parseISODate(isoDate),
  );
}
