import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { timeline } from "@/lib/data/content";

export function HistoryTimeline() {
  return (
    <section className="section story wrap">
      <div className="story-media">
        <Image
          src="/images/pub-room.webp"
          alt="The wood-paneled Tap Room with brass lamps, framed photographs and booth seating"
          width={960}
          height={640}
          sizes="(max-width: 980px) 100vw, 580px"
        />
      </div>
      <div className="story-copy">
        <Eyebrow dark>Our history</Eyebrow>
        <h2>
          Built for streetcar crews. <em>Kept</em> for the neighborhood.
        </h2>
        <ol className="timeline">
          {timeline.map((entry) => (
            <li key={entry.year}>
              <b>{entry.year}</b>
              <span>{entry.body}</span>
            </li>
          ))}
        </ol>
        <Link className="link" href="/visit#story">
          Read the full story →
        </Link>
      </div>
    </section>
  );
}
