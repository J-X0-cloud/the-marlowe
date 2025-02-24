import { z } from "zod";
import { isISODate, nightsBetween, todayInSanDiego } from "@/lib/dates";
import { MAX_NIGHTS_ONLINE, roomTypes } from "@/lib/data/rooms";

const roomSlugs = ["any", ...roomTypes.map((room) => room.slug)] as [string, ...string[]];

export const availabilitySchema = z
  .object({
    checkIn: z.string().refine(isISODate, "Choose a check-in date"),
    checkOut: z.string().refine(isISODate, "Choose a check-out date"),
    guests: z.coerce.number().int().min(1).max(4, "For five or more guests, book two rooms"),
    room: z.enum(roomSlugs).default("any"),
    code: z
      .string()
      .trim()
      .toUpperCase()
      .max(24)
      .optional()
      .transform((value) => value || undefined),
  })
  .superRefine((value, ctx) => {
    if (value.checkIn < todayInSanDiego()) {
      ctx.addIssue({ code: "custom", path: ["checkIn"], message: "Check-in can’t be in the past" });
    }
    const nights = nightsBetween(value.checkIn, value.checkOut);
    if (nights < 1) {
      ctx.addIssue({ code: "custom", path: ["checkOut"], message: "Check-out must be after check-in" });
    } else if (nights > MAX_NIGHTS_ONLINE) {
      ctx.addIssue({
        code: "custom",
        path: ["checkOut"],
        message: "For seven nights or more, email the front desk for a long-stay quote",
      });
    }
  });

export type AvailabilityQuery = z.output<typeof availabilitySchema>;
