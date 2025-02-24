import { z } from "zod";
import { isISODate, todayInSanDiego } from "@/lib/dates";
import { EVENT_MAX_GUESTS, EVENT_MIN_GUESTS, occasions, spaceChoices } from "@/lib/data/events";

const occasionValues = occasions.map((o) => o.value) as [string, ...string[]];
const spaceValues = spaceChoices.map((s) => s.value) as [string, ...string[]];

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please add your name").max(80),
  email: z.string().trim().email("Enter a valid email address"),
  date: z
    .string()
    .refine(isISODate, "Choose a preferred date")
    .refine((value) => value >= todayInSanDiego(), "Choose a date in the future"),
  guests: z.coerce
    .number({ invalid_type_error: "How many guests?" })
    .int()
    .min(EVENT_MIN_GUESTS, `Private events start at ${EVENT_MIN_GUESTS} guests`)
    .max(EVENT_MAX_GUESTS, `Our largest space holds ${EVENT_MAX_GUESTS} standing`),
  type: z.enum(occasionValues).default("rehearsal-dinner"),
  space: z.enum(spaceValues).default("not-sure"),
  message: z.string().trim().max(2000).default(""),
});

export type EventEnquiry = z.output<typeof enquirySchema>;
