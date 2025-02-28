import type { Faq } from "@/types/hotel";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faqs">
      {items.map((item) => (
        <details className="faq" key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
