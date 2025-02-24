type Channel = "rooms" | "tables" | "events" | "contact" | "newsletter";

const WEBHOOKS: Record<Channel, string | undefined> = {
  rooms: process.env.FRONT_DESK_WEBHOOK_URL,
  tables: process.env.TABLES_WEBHOOK_URL,
  events: process.env.EVENTS_WEBHOOK_URL,
  contact: process.env.FRONT_DESK_WEBHOOK_URL,
  newsletter: process.env.NEWSLETTER_WEBHOOK_URL,
};

/**
 * Hands a structured submission to the team that owns it (front desk, floor, events).
 * Without a webhook configured the payload is logged, which is what local dev relies on.
 */
export async function notifyTeam(channel: Channel, payload: Record<string, unknown>) {
  const url = WEBHOOKS[channel];
  if (!url) {
    console.info(`[${channel}] webhook not configured, submission logged`, payload);
    return;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ channel, submittedAt: new Date().toISOString(), ...payload }),
  });
  if (!response.ok) throw new Error(`${channel} webhook responded ${response.status}`);
}

export function createReference(prefix: string): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `${prefix}-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("")}`;
}
