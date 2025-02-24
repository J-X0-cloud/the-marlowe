import type { ApiResult } from "@/lib/http";

/** POSTs JSON to one of our route handlers and returns the typed envelope. */
export async function postJson<T>(url: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await response.json()) as ApiResult<T>;
  } catch {
    return { ok: false, error: "You appear to be offline. Please try again in a moment." };
  }
}
