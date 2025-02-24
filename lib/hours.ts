import { parseISODate } from "@/lib/dates";
import { openingHours, type DayCode, type Venue } from "@/lib/data/hours";

const DAY_CODES: DayCode[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function dayCodeFor(isoDate: string): DayCode {
  return DAY_CODES[parseISODate(isoDate).getDay()] ?? "Mo";
}

export function isVenueOpen(venue: Venue, isoDate: string): boolean {
  const day = dayCodeFor(isoDate);
  return openingHours.some((spec) => spec.venue === venue && spec.days.includes(day));
}
