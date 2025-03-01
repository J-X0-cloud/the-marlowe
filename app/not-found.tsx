import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BOOK_ROOM_HREF } from "@/lib/data/nav";

export default function NotFound() {
  return (
    <section className="band not-found">
      <div className="wrap">
        <Eyebrow>Page not found</Eyebrow>
        <h2>This door leads to the old building.</h2>
        <p>
          The hotel, Tap Room and Dining Room now share one site, so an older link may have sent you
          here. Everything you were looking for is a click away.
        </p>
        <div className="hero-ctas">
          <ButtonLink href={BOOK_ROOM_HREF}>Book a room</ButtonLink>
          <ButtonLink href="/dining" variant="ghost">
            See the menus
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
