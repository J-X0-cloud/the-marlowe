import clsx from "clsx";
import type { ReactNode } from "react";
import { Deco } from "@/components/ui/Deco";
import { Eyebrow } from "@/components/ui/Eyebrow";

type SectionHeadProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Brass divider under the heading. */
  deco?: boolean;
  /** Light text for dark bands. */
  light?: boolean;
};

export function SectionHead({ eyebrow, title, lede, deco = false, light = false }: SectionHeadProps) {
  return (
    <div className={clsx("sec-head", light && "light")}>
      <Eyebrow dark={!light}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {deco ? <Deco /> : null}
      {lede ? <p className="sec-lede">{lede}</p> : null}
    </div>
  );
}
