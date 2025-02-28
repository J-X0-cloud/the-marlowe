"use client";

import type { FormEvent } from "react";
import { Field, errorProps } from "@/components/ui/Field";
import { todayInSanDiego } from "@/lib/dates";
import { EVENT_MAX_GUESTS, EVENT_MIN_GUESTS, occasions, spaceChoices } from "@/lib/data/events";
import type { EnquiryReceipt } from "@/lib/services";
import { useFormSubmission } from "@/lib/use-form-submission";
import { enquirySchema } from "@/lib/validation/enquiry";

export function EnquiryForm() {
  const { state, errors, submit, reset } = useFormSubmission<EnquiryReceipt>(
    "/api/enquiries",
    enquirySchema,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(Object.fromEntries(new FormData(event.currentTarget)));
  }

  if (state.status === "success") {
    return (
      <div className="panel-form form-success" role="status">
        <h3>Thank you, we’re on it</h3>
        <p>
          Reference <strong>{state.data.reference}</strong>. We’ve pencilled in{" "}
          <strong>{state.data.suggestedSpace}</strong> as a starting point; our events manager will
          reply within one business day with availability, a sample menu and a quote.
        </p>
        <button className="btn btn-ghost-dark" type="button" onClick={reset}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="panel-form" onSubmit={handleSubmit} noValidate>
      <div className="row2">
        <Field id="e-name" label="Your name" error={errors.name}>
          <input id="e-name" type="text" name="name" autoComplete="name" {...errorProps("e-name", errors.name)} />
        </Field>
        <Field id="e-email" label="Email" error={errors.email}>
          <input
            id="e-email"
            type="email"
            name="email"
            autoComplete="email"
            {...errorProps("e-email", errors.email)}
          />
        </Field>
      </div>
      <div className="row2">
        <Field id="e-date" label="Preferred date" error={errors.date}>
          <input id="e-date" type="date" name="date" min={todayInSanDiego()} {...errorProps("e-date", errors.date)} />
        </Field>
        <Field id="e-guests" label="Guests" error={errors.guests}>
          <input
            id="e-guests"
            type="number"
            name="guests"
            min={EVENT_MIN_GUESTS}
            max={EVENT_MAX_GUESTS}
            placeholder="e.g. 40"
            {...errorProps("e-guests", errors.guests)}
          />
        </Field>
      </div>
      <div className="row2">
        <Field id="e-type" label="Occasion">
          <select id="e-type" name="type">
            {occasions.map((occasion) => (
              <option key={occasion.value} value={occasion.value}>
                {occasion.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="e-space" label="Space">
          <select id="e-space" name="space">
            {spaceChoices.map((space) => (
              <option key={space.value} value={space.value}>
                {space.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="e-msg" label="Anything else?">
        <textarea
          id="e-msg"
          name="message"
          rows={3}
          placeholder="Budget, timing, room block, dietary needs…"
        />
      </Field>
      <button className="btn btn-oxblood wide" type="submit" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
      {state.status === "error" ? (
        <p className="form-alert" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
