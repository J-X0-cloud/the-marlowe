import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { weekAtTheTapRoom } from "@/lib/data/specials";

export function WeekBand() {
  return (
    <section className="band">
      <div className="wrap band-grid">
        <div className="band-copy">
          <Eyebrow>This week at the Tap Room</Eyebrow>
          <h2>Something on every night.</h2>
          <p>
            No cover, no tickets, no fuss. Tables for Thursday jazz and Sunday roast go fast, so
            book ahead.
          </p>
          <ButtonLink href="/dining#weekly">All weekly specials</ButtonLink>
        </div>
        <ul className="week">
          {weekAtTheTapRoom.map((night) => (
            <li key={night.day}>
              <span className="day">{night.day}</span>
              <div>
                <strong>{night.title}</strong>
                <span>{night.body}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
