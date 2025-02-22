import type { Amenity, RoomType } from "@/types/hotel";

export const roomTypes: RoomType[] = [
  {
    slug: "streetcar-queen",
    name: "Streetcar Queen",
    fromRate: 189,
    weekendMultiplier: 1.2,
    description:
      "Our original single-bay rooms: a queen bed with a hand-finished maple headboard, a rain shower and a window seat over Alameda Row.",
    features: ["Queen bed", "Sleeps 2", "210 sq ft", "Street view"],
    sleeps: 2,
    squareFeet: 210,
    bed: "Queen",
    inventory: 10,
    image: {
      src: "/images/room-headboard.webp",
      alt: "Streetcar Queen at The Marlowe",
      width: 1800,
      height: 1350,
    },
  },
  {
    slug: "courtyard-king",
    name: "Courtyard King",
    fromRate: 239,
    weekendMultiplier: 1.2,
    description:
      "Quiet rooms on the garden side, with a king bed, linen drapes, a reading chair and a view down into the Loggia’s fig trees.",
    features: ["King bed", "Sleeps 2", "290 sq ft", "Courtyard view"],
    sleeps: 2,
    squareFeet: 290,
    bed: "King",
    inventory: 7,
    image: {
      src: "/images/room-courtyard.webp",
      alt: "Courtyard King at The Marlowe",
      width: 1800,
      height: 1349,
    },
  },
  {
    slug: "parlor-suite",
    name: "Parlor Suite",
    fromRate: 329,
    weekendMultiplier: 1.15,
    description:
      "Corner suites with a separate sitting parlor, original paneling, a writing desk and a bar cart stocked from downstairs.",
    features: ["King bed + sofa", "Sleeps 3", "420 sq ft", "Corner windows"],
    sleeps: 3,
    squareFeet: 420,
    bed: "King + sofa bed",
    inventory: 4,
    image: {
      src: "/images/room-parlor.webp",
      alt: "Parlor Suite at The Marlowe",
      width: 1800,
      height: 972,
    },
  },
  {
    slug: "clawfoot-suite",
    name: "Clawfoot Suite",
    fromRate: 379,
    weekendMultiplier: 1.15,
    description:
      "Our top-floor suites keep the 1926 bathrooms: hex tile, subway walls and a deep clawfoot tub under a frosted window.",
    features: ["King bed", "Sleeps 2", "460 sq ft", "Clawfoot tub"],
    sleeps: 2,
    squareFeet: 460,
    bed: "King",
    inventory: 3,
    image: {
      src: "/images/room-bath.webp",
      alt: "Clawfoot Suite at The Marlowe",
      width: 1800,
      height: 1200,
    },
  },
];

export const roomAmenities: Amenity[] = [
  {
    title: "Every room",
    body: "Organic cotton linens, blackout drapes, rain shower, Bluetooth speaker, local coffee in the morning.",
  },
  {
    title: "Book direct",
    body: "Our best rate, a welcome drink at the Tap Room, and late checkout on request.",
  },
  {
    title: "Parking",
    body: "Twelve valet spaces behind the hotel, $28 a night. Two EV chargers.",
  },
  {
    title: "Pets",
    body: "Dogs under 40 lb welcome in Courtyard rooms, with a bed and a bowl waiting.",
  },
];

export const bookingPolicies = [
  "Check-in from 3pm, checkout by 11am",
  "Free cancellation up to 48 hours before arrival",
  "Two elevator-served floors; four accessible rooms with roll-in showers",
];

/** Guest options in the home availability bar. */
export const guestOptions = [
  { value: "1-0", label: "1 adult", adults: 1, children: 0 },
  { value: "2-0", label: "2 adults", adults: 2, children: 0 },
  { value: "2-1", label: "2 adults, 1 child", adults: 2, children: 1 },
  { value: "3-0", label: "3 adults", adults: 3, children: 0 },
  { value: "4-0", label: "4 adults", adults: 4, children: 0 },
] as const;

/** Direct-booking offer codes. Percent off the room subtotal. */
export const offerCodes: Record<string, { label: string; percentOff: number; minNights?: number }> =
  {
    LETTER15: { label: "Marlowe Letter subscriber rate", percentOff: 15 },
    NORTHPARK: { label: "Neighbors’ staycation rate", percentOff: 10 },
    LONGSTAY: { label: "Three nights or more", percentOff: 12, minNights: 3 },
  };

export const TOTAL_ROOMS = roomTypes.reduce((sum, room) => sum + room.inventory, 0);
export const MAX_NIGHTS_ONLINE = 6;
