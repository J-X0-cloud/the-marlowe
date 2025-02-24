import { z } from "zod";

export const contactSchema = z.object({
  first: z.string().trim().min(1, "Add your first name").max(60),
  last: z.string().trim().max(60).default(""),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(24).default(""),
  message: z.string().trim().min(10, "Tell us a little more").max(3000),
  letter: z
    .union([z.boolean(), z.literal("on")])
    .optional()
    .transform((value) => value === true || value === "on"),
});

export type ContactMessage = z.output<typeof contactSchema>;
