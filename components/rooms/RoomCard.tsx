import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import type { RoomType } from "@/types/hotel";

export function RoomCard({ room }: { room: RoomType }) {
  return (
    <article className="room" id={room.slug}>
      <Image
        src={room.image.src}
        alt={room.image.alt}
        width={room.image.width}
        height={room.image.height}
        sizes="(max-width: 680px) 100vw, 600px"
      />
      <div className="room-body">
        <div className="room-top">
          <h3>{room.name}</h3>
          <span className="price">
            from {formatCurrency(room.fromRate)}
            <small> / night</small>
          </span>
        </div>
        <p>{room.description}</p>
        <ul className="chips">
          {room.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <Link className="btn btn-oxblood" href={`/rooms?room=${room.slug}#book`} scroll={false}>
          Check dates
        </Link>
      </div>
    </article>
  );
}
