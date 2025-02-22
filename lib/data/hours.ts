export type DayCode = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export type Venue = "front-desk" | "tap-room" | "dining-room" | "brunch";

export type OpeningHoursSpec = {
  venue: Venue;
  days: DayCode[];
  opens: string;
  closes: string;
};

const EVERY_DAY: DayCode[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/** Single source for hours: topbar, footer, visit table, table slots and JSON-LD. */
export const openingHours: OpeningHoursSpec[] = [
  { venue: "front-desk", days: EVERY_DAY, opens: "00:00", closes: "23:59" },
  { venue: "tap-room", days: EVERY_DAY, opens: "12:00", closes: "24:00" },
  {
    venue: "dining-room",
    days: ["Tu", "We", "Th", "Fr", "Sa", "Su"],
    opens: "17:00",
    closes: "22:00",
  },
  { venue: "brunch", days: ["Sa", "Su"], opens: "09:00", closes: "14:00" },
];

export const topbarHours = "Hotel open daily · Tap Room noon–midnight · Kitchen till 10pm";

export const footerHours = [
  "Front desk: 24 hours",
  "Tap Room: daily, noon–midnight",
  "Dining Room: Tue–Sun, 5–10pm",
  "Weekend brunch: 9am–2pm",
];

export const hoursTable = [
  { label: "Tap Room", value: "Daily, noon–midnight" },
  { label: "Dining Room", value: "Tue–Sun, 5–10pm" },
  { label: "Brunch", value: "Sat & Sun, 9am–2pm" },
  { label: "Front desk", value: "24 hours" },
];
