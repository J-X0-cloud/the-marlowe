import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Hero() {
  return (
    <section className="hero">
      <Image
        src="/images/bar-hero.webp"
        alt="A tumbler on the Tap Room bar, lit by warm pendant lamps and carved wood screens"
        width={1800}
        height={1218}
        sizes="100vw"
        priority
      />
      <div className="wrap hero-in">
        <Eyebrow>Hotel · Tap Room · Dining Room · Since 1926</Eyebrow>
        <h1>
          North Park’s grand old <em>front porch.</em>
        </h1>
        <p>
          Twenty-four restored rooms above a neighborhood tap room and a candlelit dining room, a
          block off University Avenue. Stay the night, or just stay for another round.
        </p>
        <div className="hero-ctas">
          <ButtonLink href="/rooms">See the rooms</ButtonLink>
          <ButtonLink href="/dining" variant="ghost">
            Tonight’s menu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
