import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { threeWaysIn } from "@/lib/data/content";

export function ThreeWaysIn() {
  return (
    <section className="section trio-sec">
      <div className="wrap">
        <SectionHead eyebrow="Three ways in" title="Stay, eat & drink, gather." deco />
        <div className="trio">
          {threeWaysIn.map((card) => (
            <Link className="card" href={card.href} key={card.title}>
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 400px"
              />
              <div className="card-body">
                <span className="kicker">{card.kicker}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <span className="more">{card.cta}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
