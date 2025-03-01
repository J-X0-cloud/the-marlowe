import { fail, ok, readJson, validationFailed } from "@/lib/http";
import { notifyTeam } from "@/lib/notify";
import { newsletterSchema } from "@/lib/validation/newsletter";

export async function POST(request: Request) {
  const parsed = newsletterSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationFailed(parsed.error);

  try {
    await notifyTeam("newsletter", { email: parsed.data.email, list: "the-marlowe-letter" });
    return ok({ subscribed: true });
  } catch (error) {
    console.error("newsletter signup failed", error);
    return fail("Something went wrong. Please try again.", 502);
  }
}
