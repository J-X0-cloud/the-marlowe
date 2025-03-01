import { fail, ok, readJson, validationFailed } from "@/lib/http";
import { requestTable } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { tableReservationSchema } from "@/lib/validation/table";

export async function POST(request: Request) {
  const parsed = tableReservationSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationFailed(parsed.error);

  try {
    return ok(await requestTable(parsed.data), 201);
  } catch (error) {
    console.error("table reservation failed", error);
    return fail(`We couldn’t send your request. Please call ${siteConfig.phone.display}.`, 502);
  }
}
