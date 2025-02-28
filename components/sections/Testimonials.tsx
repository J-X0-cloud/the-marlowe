import type { Testimonial } from "@/types/hotel";

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="quotes">
      {items.map((item) => (
        <figure key={item.name}>
          <blockquote>“{item.quote}”</blockquote>
          <figcaption>
            {item.name} · {item.context}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
