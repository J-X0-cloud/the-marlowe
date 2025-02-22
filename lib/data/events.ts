import type { EventPackage, EventSpace } from "@/types/hotel";

export const eventSpaces: EventSpace[] = [
  {
    slug: "mezzanine",
    name: "The Mezzanine",
    description:
      "Our largest room: beamed ceiling, a skylight and its own bar. Weddings, galas and company parties.",
    capacity: "90 seated · 140 standing",
    minimum: "from $4,500 minimum",
    seated: 90,
    standing: 140,
    image: {
      src: "/images/events-hall.webp",
      alt: "The Mezzanine set for an event",
      width: 960,
      height: 640,
    },
  },
  {
    slug: "loggia",
    name: "The Loggia",
    description:
      "The courtyard under fig trees and Edison bulbs, with heaters and a retractable canopy for cool evenings.",
    capacity: "60 seated · 90 standing",
    minimum: "from $2,800 minimum",
    seated: 60,
    standing: 90,
    image: {
      src: "/images/pub-lights.webp",
      alt: "The Loggia set for an event",
      width: 960,
      height: 721,
    },
  },
  {
    slug: "library-room",
    name: "The Library Room",
    description:
      "A private dining room lined with shelves, set for one long table. Rehearsal dinners and board meetings.",
    capacity: "24 seated",
    minimum: "from $1,200 minimum",
    seated: 24,
    standing: 24,
    image: {
      src: "/images/place-setting.webp",
      alt: "The Library Room set for an event",
      width: 960,
      height: 548,
    },
  },
];

export const eventPackages: EventPackage[] = [
  {
    kicker: "Casual",
    name: "Tap Room Social",
    pricePerPerson: 58,
    inclusions: [
      "Two hours of passed bar bites",
      "Draft beer, wine & one house cocktail",
      "Best for birthdays & team nights",
    ],
  },
  {
    kicker: "Most booked",
    name: "Family-Style Supper",
    pricePerPerson: 95,
    featured: true,
    inclusions: [
      "Welcome drink & canapés",
      "Three shared courses from the Dining Room",
      "Printed menus & place cards",
    ],
  },
  {
    kicker: "The full evening",
    name: "Grand Marlowe",
    pricePerPerson: 165,
    inclusions: [
      "Four-course seated dinner",
      "Five-hour bar with a signature cocktail",
      "Discounted room block for guests",
    ],
  },
];

export const weddingPerks = [
  "Ceremonies for up to 120 in the Loggia",
  "Room blocks from five rooms, released 30 days out",
  "Preferred florists, bands and photographers on request",
];

export const occasions = [
  { value: "rehearsal-dinner", label: "Rehearsal dinner" },
  { value: "wedding", label: "Wedding" },
  { value: "celebration", label: "Birthday or anniversary" },
  { value: "company", label: "Company event" },
  { value: "other", label: "Something else" },
] as const;

export const spaceChoices = [
  { value: "not-sure", label: "Not sure yet" },
  ...eventSpaces.map((space) => ({ value: space.slug, label: space.name })),
  { value: "buyout", label: "Whole-house buyout" },
];

export const EVENT_MIN_GUESTS = 8;
export const EVENT_MAX_GUESTS = 140;
