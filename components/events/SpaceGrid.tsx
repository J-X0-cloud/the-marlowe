import Image from "next/image";
import { eventSpaces } from "@/lib/data/events";

export function SpaceGrid() {
  return (
    <div className="spaces">
      {eventSpaces.map((space) => (
        <article className="space" key={space.slug} id={space.slug}>
          <Image
            src={space.image.src}
            alt={space.image.alt}
            width={space.image.width}
            height={space.image.height}
            sizes="(max-width: 680px) 100vw, 400px"
          />
          <div className="space-body">
            <h3>{space.name}</h3>
            <p>{space.description}</p>
            <dl>
              <div>
                <dt>Capacity</dt>
                <dd>{space.capacity}</dd>
              </div>
              <div>
                <dt>Food &amp; beverage</dt>
                <dd>{space.minimum}</dd>
              </div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}
