"use client";

import type { FormEvent } from "react";
import { Field, errorProps } from "@/components/ui/Field";
import type { ContactReceipt } from "@/lib/services";
import { useFormSubmission } from "@/lib/use-form-submission";
import { contactSchema } from "@/lib/validation/contact";

export function ContactForm() {
  const { state, errors, submit, reset } = useFormSubmission<ContactReceipt>(
    "/api/contact",
    contactSchema,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void submit({ ...Object.fromEntries(data), letter: data.get("letter") === "on" });
  }

  if (state.status === "success") {
    return (
      <div className="panel-form form-success" role="status">
        <h3>Message received</h3>
        <p>
          Thanks for writing in. A real person will reply within a day (reference{" "}
          {state.data.reference}).
        </p>
        <button className="btn btn-ghost-dark" type="button" onClick={reset}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="panel-form" onSubmit={handleSubmit} noValidate>
      <div className="row2">
        <Field id="c-first" label="First name" error={errors.first}>
          <input
            id="c-first"
            type="text"
            name="first"
            autoComplete="given-name"
            {...errorProps("c-first", errors.first)}
          />
        </Field>
        <Field id="c-last" label="Last name">
          <input id="c-last" type="text" name="last" autoComplete="family-name" />
        </Field>
      </div>
      <div className="row2">
        <Field id="c-email" label="Email" error={errors.email}>
          <input
            id="c-email"
            type="email"
            name="email"
            autoComplete="email"
            {...errorProps("c-email", errors.email)}
          />
        </Field>
        <Field id="c-phone" label="Phone">
          <input id="c-phone" type="tel" name="phone" autoComplete="tel" />
        </Field>
      </div>
      <Field id="c-msg" label="Message" error={errors.message}>
        <textarea id="c-msg" name="message" rows={4} {...errorProps("c-msg", errors.message)} />
      </Field>
      <label className="check">
        <input type="checkbox" name="letter" /> Add me to The Marlowe Letter
      </label>
      <button className="btn btn-oxblood wide" type="submit" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending…" : "Send message"}
      </button>
      {state.status === "error" ? (
        <p className="form-alert" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
