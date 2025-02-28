import Image from "next/image";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  image: { src: string; alt: string; position?: string };
};

export function PageHero({ eyebrow, title, lede, image }: PageHeroProps) {
  return (
    <section className="phero">
      <Image
        src={image.src}
        alt={image.alt}
        width={1800}
        height={1200}
        sizes="100vw"
        priority
        style={{ objectPosition: image.position ?? "center" }}
      />
      <div className="wrap phero-in">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{lede}</p>
      </div>
    </section>
  );
}
