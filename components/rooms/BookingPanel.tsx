"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Field, errorProps } from "@/components/ui/Field";
import { postJson } from "@/lib/api-client";
import type { AvailabilityResult, RoomQuote } from "@/lib/availability";
import { addDays, formatShortDate, todayInSanDiego } from "@/lib/dates";
import { roomTypes } from "@/lib/data/rooms";
import { formatCurrency, pluralize } from "@/lib/format";
import type { ApiResult } from "@/lib/http";
import { siteConfig } from "@/lib/site";
import { availabilitySchema } from "@/lib/validation/availability";

export type StayDefaults = {
  checkIn: string;
  checkOut: string;
  guests: number;
  room: string;
  code: string;
  /** Run the search on mount (the guest arrived from the home availability bar). */
  autoSearch: boolean;
};

type Search =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string; fieldErrors: Record<string, string | undefined> }
  | { status: "done"; result: AvailabilityResult };

type Booking = { reference: string; room: string; total: number; nights: number };

export function BookingPanel({ defaults }: { defaults: StayDefaults }) {
  const [stay, setStay] = useState({
    checkIn: defaults.checkIn,
    checkOut: defaults.checkOut,
    guests: defaults.guests,
    room: defaults.room,
    code: defaults.code,
  });
  const [search, setSearch] = useState<Search>({ status: "idle" });
  const [selected, setSelected] = useState<RoomQuote | null>(null);

  async function runSearch(query = stay) {
    const parsed = availabilitySchema.safeParse(query);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setSearch({
        status: "error",
        message: "Please check your dates.",
        fieldErrors: Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0]])),
      });
      return;
    }

    setSearch({ status: "loading" });
    setSelected(null);
    const params = new URLSearchParams({
      checkIn: query.checkIn,
      checkOut: query.checkOut,
      guests: String(query.guests),
      room: query.room,
      ...(query.code ? { code: query.code } : {}),
    });

    try {
      const response = await fetch(`/api/availability?${params.toString()}`);
      const body = (await response.json()) as ApiResult<AvailabilityResult>;
      if (body.ok) {
        setSearch({ status: "done", result: body.data });
      } else {
        const fieldErrors = Object.fromEntries(
          Object.entries(body.fieldErrors ?? {}).map(([k, v]) => [k, v?.[0]]),
        );
        setSearch({ status: "error", message: body.error, fieldErrors });
      }
    } catch {
      setSearch({ status: "error", message: "We couldn’t reach the booking system.", fieldErrors: {} });
    }
  }

  useEffect(() => {
    if (defaults.autoSearch) void runSearch();
    // Only on mount: later searches are explicit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSearch();
  }

  const errors = search.status === "error" ? search.fieldErrors : {};

  return (
    <div className="panel-stack">
      <form className="panel-form" onSubmit={handleSubmit} noValidate>
        <div className="row2">
          <Field id="r-in" label="Check in" error={errors.checkIn}>
            <input
              id="r-in"
              type="date"
              name="checkIn"
              min={todayInSanDiego()}
              value={stay.checkIn}
              onChange={(event) => {
                const checkIn = event.target.value;
                setStay((s) => ({
                  ...s,
                  checkIn,
                  checkOut: s.checkOut > checkIn ? s.checkOut : addDays(checkIn, 1),
                }));
              }}
              suppressHydrationWarning
              {...errorProps("r-in", errors.checkIn)}
            />
          </Field>
          <Field id="r-out" label="Check out" error={errors.checkOut}>
            <input
              id="r-out"
              type="date"
              name="checkOut"
              min={stay.checkIn ? addDays(stay.checkIn, 1) : undefined}
              value={stay.checkOut}
              onChange={(event) => setStay((s) => ({ ...s, checkOut: event.target.value }))}
              suppressHydrationWarning
              {...errorProps("r-out", errors.checkOut)}
            />
          </Field>
        </div>
        <div className="row2">
          <Field id="r-room" label="Room type">
            <select
              id="r-room"
              name="room"
              value={stay.room}
              onChange={(event) => setStay((s) => ({ ...s, room: event.target.value }))}
            >
              <option value="any">Any room</option>
              {roomTypes.map((room) => (
                <option key={room.slug} value={room.slug}>
                  {room.name}
                </option>
              ))}
            </select>
          </Field>
          <Field id="r-g" label="Guests" error={errors.guests}>
            <select
              id="r-g"
              name="guests"
              value={stay.guests}
              onChange={(event) => setStay((s) => ({ ...s, guests: Number(event.target.value) }))}
            >
              {[1, 2, 3, 4].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field id="r-code" label="Offer or group code">
          <input
            id="r-code"
            type="text"
            name="code"
            placeholder="Optional"
            value={stay.code}
            onChange={(event) => setStay((s) => ({ ...s, code: event.target.value }))}
          />
        </Field>
        <button className="btn btn-oxblood wide" type="submit" disabled={search.status === "loading"}>
          {search.status === "loading" ? "Checking…" : "Show available rooms"}
        </button>
        {search.status === "error" ? (
          <p className="form-alert" role="alert">
            {search.message}
          </p>
        ) : null}
        <p className="form-note">
          Prefer to talk it through? Call the front desk any time on{" "}
          <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.
        </p>
      </form>

      {search.status === "done" ? (
        <AvailabilityResults
          result={search.result}
          selected={selected}
          onSelect={setSelected}
          stay={stay}
        />
      ) : null}
    </div>
  );
}

type ResultsProps = {
  result: AvailabilityResult;
  selected: RoomQuote | null;
  onSelect: (room: RoomQuote | null) => void;
  stay: { checkIn: string; checkOut: string; guests: number; room: string; code: string };
};

function AvailabilityResults({ result, selected, onSelect, stay }: ResultsProps) {
  const range = `${formatShortDate(result.checkIn)} – ${formatShortDate(result.checkOut)}`;

  return (
    <div className="results" aria-live="polite">
      <p className="results-head">
        <strong>{range}</strong> · {pluralize(result.nights, "night")} ·{" "}
        {pluralize(result.guests, "guest")}
        {result.offer ? <span className="offer-ok"> · {result.offer.label} applied</span> : null}
      </p>
      {result.offerMessage ? <p className="form-alert">{result.offerMessage}</p> : null}

      {result.available.length === 0 ? (
        <p className="results-empty">
          We’re full for those dates in the rooms you picked. Try moving a night, or call the front
          desk and we’ll check the waitlist.
        </p>
      ) : (
        <ul className="quote-list">
          {result.available.map((room) => (
            <li key={room.slug} className={room === selected ? "is-selected" : undefined}>
              <div>
                <strong>{room.name}</strong>
                <span>
                  {formatCurrency(room.averageNightly)} avg / night
                  {room.roomsLeft <= 2 ? ` · only ${room.roomsLeft} left` : ""}
                </span>
              </div>
              <div className="quote-total">
                {room.discount > 0 ? <s>{formatCurrency(room.subtotal)}</s> : null}
                <b>{formatCurrency(room.total, { cents: room.discount % 1 !== 0 })}</b>
                <button
                  type="button"
                  className="btn btn-ghost-dark"
                  onClick={() => onSelect(room === selected ? null : room)}
                  aria-expanded={room === selected}
                >
                  {room === selected ? "Change" : "Select"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {result.unavailable.length > 0 ? (
        <p className="results-note">
          {result.unavailable
            .map((room) => `${room.name}: ${room.reason === "sold-out" ? "sold out" : "sleeps fewer guests"}`)
            .join(" · ")}
        </p>
      ) : null}

      {selected ? <GuestDetails room={selected} stay={stay} /> : null}
      <p className="results-note">Rates are per room, before occupancy tax.</p>
    </div>
  );
}

function GuestDetails({ room, stay }: { room: RoomQuote; stay: ResultsProps["stay"] }) {
  const [state, setState] = useState<
    { status: "idle" | "sending" } | { status: "error"; message: string } | { status: "done"; booking: Booking }
  >({ status: "idle" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setState({ status: "sending" });
    const result = await postJson<Booking>("/api/bookings", {
      stay: { ...stay, room: room.slug, code: stay.code || undefined },
      roomSlug: room.slug,
      ...data,
    });
    if (result.ok) {
      setState({ status: "done", booking: result.data });
    } else {
      setErrors(Object.fromEntries(Object.entries(result.fieldErrors ?? {}).map(([k, v]) => [k, v?.[0]])));
      setState({ status: "error", message: result.error });
    }
  }

  if (state.status === "done") {
    return (
      <div className="guest-done" role="status">
        <h3>Request sent</h3>
        <p>
          {state.booking.room}, {pluralize(state.booking.nights, "night")},{" "}
          {formatCurrency(state.booking.total, { cents: true })}. Reference{" "}
          <strong>{state.booking.reference}</strong>. The front desk will email your confirmation
          and a secure card link within the hour.
        </p>
      </div>
    );
  }

  return (
    <form className="guest-form" onSubmit={handleSubmit} noValidate>
      <h3>Request the {room.name}</h3>
      <div className="row2">
        <Field id="g-name" label="Lead guest" error={errors.name}>
          <input id="g-name" name="name" autoComplete="name" required {...errorProps("g-name", errors.name)} />
        </Field>
        <Field id="g-email" label="Email" error={errors.email}>
          <input
            id="g-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            {...errorProps("g-email", errors.email)}
          />
        </Field>
      </div>
      <Field id="g-phone" label="Mobile (optional)">
        <input id="g-phone" type="tel" name="phone" autoComplete="tel" />
      </Field>
      <button className="btn btn-oxblood wide" type="submit" disabled={state.status === "sending"}>
        {state.status === "sending" ? "Sending…" : "Request booking"}
      </button>
      {state.status === "error" ? (
        <p className="form-alert" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
