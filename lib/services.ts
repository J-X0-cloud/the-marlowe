import { formatLongDate } from "@/lib/dates";
import { eventSpaces, occasions, spaceChoices } from "@/lib/data/events";
import { partySizes, seatingAreas } from "@/lib/data/tables";
import { formatTime } from "@/lib/format";
import { createReference, notifyTeam } from "@/lib/notify";
import type { ContactMessage } from "@/lib/validation/contact";
import type { EventEnquiry } from "@/lib/validation/enquiry";
import type { TableReservation } from "@/lib/validation/table";

export type TableConfirmation = { reference: string; summary: string };
export type EnquiryReceipt = { reference: string; suggestedSpace: string };
export type ContactReceipt = { reference: string };

const labelFor = <T extends { value: string; label: string }>(list: readonly T[], value: string) =>
  list.find((entry) => entry.value === value)?.label ?? value;

export async function requestTable(input: TableReservation): Promise<TableConfirmation> {
  const reference = createReference("TBL");
  const summary = `${labelFor(partySizes, input.party)} in the ${labelFor(seatingAreas, input.area)}, ${formatLongDate(input.date)} at ${formatTime(input.time)}`;
  await notifyTeam("tables", { reference, summary, ...input });
  return { reference, summary };
}

/** Smallest space that seats the party, unless the guest already picked one. */
export function suggestSpace(enquiry: EventEnquiry): string {
  if (enquiry.space !== "not-sure") return labelFor(spaceChoices, enquiry.space);
  const bySize = [...eventSpaces].sort((a, b) => a.seated - b.seated);
  const fit = bySize.find((space) => space.seated >= enquiry.guests);
  if (fit) return fit.name;
  return eventSpaces.some((space) => space.standing >= enquiry.guests)
    ? "The Mezzanine (standing reception)"
    : "Whole-house buyout";
}

export async function submitEnquiry(enquiry: EventEnquiry): Promise<EnquiryReceipt> {
  const reference = createReference("EVT");
  const suggestedSpace = suggestSpace(enquiry);
  await notifyTeam("events", {
    reference,
    suggestedSpace,
    occasionLabel: labelFor(occasions, enquiry.type),
    dateLabel: formatLongDate(enquiry.date),
    ...enquiry,
  });
  return { reference, suggestedSpace };
}

export async function sendContactMessage(message: ContactMessage): Promise<ContactReceipt> {
  const reference = createReference("MSG");
  await notifyTeam("contact", { reference, ...message });
  if (message.letter) await notifyTeam("newsletter", { email: message.email, source: "contact" });
  return { reference };
}
