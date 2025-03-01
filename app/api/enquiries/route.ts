import { fail, ok, readJson, validationFailed } from "@/lib/http";
import { submitEnquiry } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { enquirySchema } from "@/lib/validation/enquiry";

export async function POST(request: Request) {
  const parsed = enquirySchema.safeParse(await readJson(request));
  if (!parsed.success) return validationFailed(parsed.error);

  try {
    return ok(await submitEnquiry(parsed.data), 201);
  } catch (error) {
    console.error("event enquiry failed", error);
    return fail(`We couldn’t send your enquiry. Please email ${siteConfig.email}.`, 502);
  }
}
