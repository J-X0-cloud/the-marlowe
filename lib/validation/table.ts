import { z } from "zod";
import { isISODate, todayInSanDiego } from "@/lib/dates";
import { partySizes, seatingAreas, tableTimes } from "@/lib/data/tables";
import { isVenueOpen } from "@/lib/hours";

const partyValues = partySizes.map((p) => p.value) as [string, ...string[]];
const areaValues = seatingAreas.map((a) => a.value) as [string, ...string[]];

export const tableReservationSchema = z
  .object({
    date: z.string().refine(isISODate, "Choose a date"),
    time: z.enum(tableTimes, { errorMap: () => ({ message: "Choose a time" }) }),
    party: z.enum(partyValues),
    area: z.enum(areaValues).default("dining-room"),
    name: z.string().trim().min(2, "Who is the table for?").max(80),
    phone: z.string().trim().regex(/^\+?[\d\s().-]{7,20}$/, "Enter a number we can call or text"),
    notes: z.string().trim().max(300).default(""),
  })
  .superRefine((value, ctx) => {
    if (value.date < todayInSanDiego()) {
      ctx.addIssue({ code: "custom", path: ["date"], message: "That date has passed" });
    } else if (value.area === "dining-room" && !isVenueOpen("dining-room", value.date)) {
      ctx.addIssue({
        code: "custom",
        path: ["date"],
        message: "The Dining Room is closed on Mondays; the Tap Room is open",
      });
    }
  });

export type TableReservation = z.output<typeof tableReservationSchema>;
