import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "brass" | "ghost" | "ghost-dark" | "oxblood";

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  wide?: boolean;
  className?: string;
  children: ReactNode;
};

export const buttonClass = (variant: ButtonVariant, wide = false, className?: string) =>
  clsx("btn", `btn-${variant}`, wide && "wide", className);

/** Button-styled link; phone and email links stay plain anchors. */
export function ButtonLink({ href, variant = "brass", wide, className, children }: ButtonLinkProps) {
  const classes = buttonClass(variant, wide, className);
  if (/^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
