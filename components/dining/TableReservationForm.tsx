"use client";

import { useState, type FormEvent } from "react";
import { Field, errorProps } from "@/components/ui/Field";
import { todayInSanDiego } from "@/lib/dates";
import { partySizes, seatingAreas, tableTimes } from "@/lib/data/tables";
import { formatTime } from "@/lib/format";
import { isVenueOpen } from "@/lib/hours";
import type { TableConfirmation } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { useFormSubmission } from "@/lib/use-form-submission";
import { tableReservationSchema } from "@/lib/validation/table";

export function TableReservationForm() {
  const [date, setDate] = useState("");
  const [area, setArea] = useState("dining-room");
  const { state, errors, submit, reset } = useFormSubmission<TableConfirmation>(
    "/api/reservations",
    tableReservationSchema,
  );

  const diningClosed = date !== "" && area === "dining-room" && !isVenueOpen("dining-room", date);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(Object.fromEntries(new FormData(event.currentTarget)));
  }

  if (state.status === "success") {
    return (
      <div className="panel-form form-success" role="status">
        <h3>See you soon</h3>
        <p>
          {state.data.summary}. Reference <strong>{state.data.reference}</strong>; we’ll text to
          confirm shortly.
        </p>
        <button className="btn btn-ghost-dark" type="button" onClick={reset}>
          Book another table
        </button>
      </div>
    );
  }

  return (
    <form className="panel-form" onSubmit={handleSubmit} noValidate>
      <div className="row2">
        <Field
          id="t-date"
          label="Date"
          error={errors.date ?? (diningClosed ? "The Dining Room is closed on Mondays; the Tap Room is open" : undefined)}
        >
          <input
            id="t-date"
            type="date"
            name="date"
            min={todayInSanDiego()}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            {...errorProps("t-date", errors.date)}
          />
        </Field>
        <Field id="t-time" label="Time" error={errors.time}>
          <select id="t-time" name="time" defaultValue="19:00">
            {tableTimes.map((time) => (
              <option key={time} value={time}>
                {formatTime(time)}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="row2">
        <Field id="t-party" label="Party size">
          <select id="t-party" name="party" defaultValue="2">
            {partySizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="t-room" label="Seating">
          <select id="t-room" name="area" value={area} onChange={(event) => setArea(event.target.value)}>
            {seatingAreas.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="row2">
        <Field id="t-name" label="Name" error={errors.name}>
          <input id="t-name" name="name" autoComplete="name" {...errorProps("t-name", errors.name)} />
        </Field>
        <Field id="t-phone" label="Phone" error={errors.phone}>
          <input
            id="t-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            {...errorProps("t-phone", errors.phone)}
          />
        </Field>
      </div>
      <Field id="t-note" label="Occasion or dietary notes">
        <input id="t-note" type="text" name="notes" placeholder="Birthday, anniversary, allergies…" />
      </Field>
      <button className="btn btn-oxblood wide" type="submit" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending…" : "Find a table"}
      </button>
      {state.status === "error" ? (
        <p className="form-alert" role="alert">
          {state.message}
        </p>
      ) : null}
      <p className="form-note">
        Running late or need to change? Call <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.
      </p>
    </form>
  );
}
