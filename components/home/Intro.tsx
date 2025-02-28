import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { houseFacts } from "@/lib/data/content";

export function Intro() {
  return (
    <section className="section intro wrap">
      <div className="intro-copy">
        <Eyebrow dark>Welcome in</Eyebrow>
        <h2>
          A hundred years of <em>last calls</em> on Alameda Row.
        </h2>
        <p>
          The Marlowe opened in 1926 as a residential hotel for streetcar crews and the young
          families moving into North Park’s new bungalows. The tile, the terrazzo and the long
          mahogany bar all survived. We kept them, fixed the plumbing, and filled the place back up
          with people.
        </p>
        <p>
          Come in for a pint at the bar, a slow dinner under the old pressed-tin ceiling, or a
          weekend in a room with a clawfoot tub and the windows open to the jacarandas.
        </p>
        <div className="facts">
          {houseFacts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="intro-media">
        <Image
          className="im-a"
          src="/images/food-spread.webp"
          alt="Shared plates of oysters, salmon tartare, blistered peppers and fries with red and white wine"
          width={1290}
          height={570}
          sizes="(max-width: 980px) 100vw, 620px"
        />
        <Image
          className="im-b"
          src="/images/tap-pour.webp"
          alt="A bartender holding a freshly poured pale ale up to the light"
          width={1255}
          height={645}
          sizes="(max-width: 680px) 56vw, 320px"
        />
      </div>
    </section>
  );
}
