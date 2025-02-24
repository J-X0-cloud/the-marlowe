import { z } from "zod";
import { availabilitySchema } from "@/lib/validation/availability";

/** A booking request is an availability query for one room type plus the lead guest. */
export const bookingRequestSchema = z.object({
  stay: availabilitySchema,
  roomSlug: z.string().min(1),
  name: z.string().trim().min(2, "Add the lead guest’s name").max(80),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(24).default(""),
});

export type BookingRequest = z.output<typeof bookingRequestSchema>;
