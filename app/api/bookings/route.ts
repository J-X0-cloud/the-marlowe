import { checkAvailability } from "@/lib/availability";
import { fail, ok, readJson, validationFailed } from "@/lib/http";
import { createReference, notifyTeam } from "@/lib/notify";
import { siteConfig } from "@/lib/site";
import { bookingRequestSchema } from "@/lib/validation/booking";

/**
 * POST /api/bookings — re-prices the stay server-side (never trusting client totals),
 * confirms the room type is still free and passes the request to the front desk.
 */
export async function POST(request: Request) {
  const parsed = bookingRequestSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationFailed(parsed.error);

  const { stay, roomSlug, ...guest } = parsed.data;

  try {
    const availability = await checkAvailability({ ...stay, room: roomSlug });
    const quote = availability.available.find((room) => room.slug === roomSlug);
    if (!quote) {
      return fail("That room type has just been booked for your dates. Please pick another.", 409);
    }

    const reference = createReference("MAR");
    await notifyTeam("rooms", {
      reference,
      ...guest,
      room: quote.name,
      checkIn: stay.checkIn,
      checkOut: stay.checkOut,
      guests: stay.guests,
      offer: availability.offer?.code ?? null,
      total: quote.total,
    });

    return ok({ reference, room: quote.name, total: quote.total, nights: availability.nights }, 201);
  } catch (error) {
    console.error("booking request failed", error);
    return fail(`We couldn’t place your request. Please call ${siteConfig.phone.display}.`, 502);
  }
}
