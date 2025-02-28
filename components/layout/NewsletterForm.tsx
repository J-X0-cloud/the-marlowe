"use client";

import { useState, type FormEvent } from "react";
import { postJson } from "@/lib/api-client";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    const result = await postJson<{ subscribed: boolean }>("/api/newsletter", {
      email: new FormData(form).get("email"),
    });
    if (result.ok) {
      setStatus("done");
      setMessage("Thanks, you’re on the list.");
      form.reset();
    } else {
      setStatus("error");
      setMessage(result.fieldErrors?.email?.[0] ?? result.error);
    }
  }

  return (
    <form className="foot-news" onSubmit={handleSubmit} noValidate>
      <h3>The Marlowe Letter</h3>
      <p>New menus, jazz nights and quiet-season room rates, once a month.</p>
      <label className="sr" htmlFor="news-email">
        Email address
      </label>
      <div className="news-row">
        <input
          id="news-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          aria-invalid={status === "error" || undefined}
        />
        <button className="btn btn-brass" type="submit" disabled={status === "sending"}>
          Subscribe
        </button>
      </div>
      <p className="news-status" role="status">
        {message}
      </p>
    </form>
  );
}
