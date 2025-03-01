import { fail, ok, readJson, validationFailed } from "@/lib/http";
import { sendContactMessage } from "@/lib/services";
import { contactSchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationFailed(parsed.error);

  try {
    return ok(await sendContactMessage(parsed.data), 201);
  } catch (error) {
    console.error("contact message failed", error);
    return fail("Your message didn’t go through. Please try again in a moment.", 502);
  }
}
