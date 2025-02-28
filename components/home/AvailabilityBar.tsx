"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { addDays, defaultStay, todayInSanDiego } from "@/lib/dates";
import { guestOptions } from "@/lib/data/rooms";

/**
 * Hero availability bar. Hands the stay to the booking panel on /rooms, which
 * reads the query string and runs the live availability search.
 */
export function AvailabilityBar() {
  const router = useRouter();
  // Dates are relative to "today" in San Diego, so the prerendered HTML can be a day behind;
  // the inputs opt out of the hydration warning and pick up the client's value.
  const [stay, setStay] = useState(defaultStay);
  const [guests, setGuests] = useState<string>("2-0");
  const [code, setCode] = useState("");

  function updateCheckIn(checkIn: string) {
    // Keep at least one night: push check-out forward if the new check-in passes it.
    setStay((current) => ({
      checkIn,
      checkOut: current.checkOut > checkIn ? current.checkOut : addDays(checkIn, 1),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const option = guestOptions.find((o) => o.value === guests) ?? guestOptions[1];
    const params = new URLSearchParams({
      checkIn: stay.checkIn,
      checkOut: stay.checkOut,
      guests: String(option.adults + option.children),
    });
    if (code.trim()) params.set("code", code.trim());
    router.push(`/rooms?${params.toString()}#book`);
  }

  return (
    <section className="wrap booking-wrap" aria-label="Check availability">
      <form className="booking" id="book" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="b-in">Check in</label>
          <input
            id="b-in"
            type="date"
            name="checkIn"
            min={todayInSanDiego()}
            value={stay.checkIn}
            onChange={(event) => updateCheckIn(event.target.value)}
            required
            suppressHydrationWarning
          />
        </div>
        <div className="field">
          <label htmlFor="b-out">Check out</label>
          <input
            id="b-out"
            type="date"
            name="checkOut"
            min={addDays(stay.checkIn, 1)}
            value={stay.checkOut}
            onChange={(event) => setStay((s) => ({ ...s, checkOut: event.target.value }))}
            required
            suppressHydrationWarning
          />
        </div>
        <div className="field">
          <label htmlFor="b-guests">Guests</label>
          <select
            id="b-guests"
            name="guests"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
          >
            {guestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="b-code">Offer code</label>
          <input
            id="b-code"
            type="text"
            name="code"
            placeholder="Optional"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </div>
        <button className="btn btn-oxblood" type="submit">
          Check availability
        </button>
        <p className="booking-note">
          Best rate when you book direct · free cancellation up to 48 hours before arrival
        </p>
      </form>
    </section>
  );
}
