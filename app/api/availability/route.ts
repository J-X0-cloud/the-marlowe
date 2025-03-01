import type { NextRequest } from "next/server";
import { checkAvailability } from "@/lib/availability";
import { fail, ok, validationFailed } from "@/lib/http";
import { availabilitySchema } from "@/lib/validation/availability";

/**
 * GET /api/availability?checkIn=2026-10-16&checkOut=2026-10-18&guests=2&room=any&code=
 * Returns bookable room types with nightly rates and totals for the stay.
 */
export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = availabilitySchema.safeParse(params);
  if (!parsed.success) return validationFailed(parsed.error);

  try {
    const result = await checkAvailability(parsed.data);
    const response = ok(result);
    response.headers.set("Cache-Control", "private, max-age=60");
    return response;
  } catch (error) {
    console.error("availability lookup failed", error);
    return fail("We couldn’t load live availability. Please call the front desk.", 503);
  }
}
