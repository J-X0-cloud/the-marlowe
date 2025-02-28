"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { NavLinks } from "@/components/layout/NavLinks";
import { BOOK_ROOM_HREF, BOOK_TABLE_HREF, mobileNav } from "@/lib/data/nav";

/** Native <details> menu: works before hydration, then closes on navigation and Escape. */
export function MobileNav() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") ref.current?.removeAttribute("open");
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = () => ref.current?.removeAttribute("open");

  return (
    <details className="mnav" ref={ref}>
      <summary aria-label="Open menu">
        <span className="burger" />
      </summary>
      <nav className="mnav-panel" aria-label="Mobile">
        <NavLinks links={mobileNav} onNavigate={close} />
        <Link className="btn btn-brass" href={BOOK_ROOM_HREF} onClick={close}>
          Book a room
        </Link>
        <Link className="btn btn-ghost-dark" href={BOOK_TABLE_HREF} onClick={close}>
          Book a table
        </Link>
      </nav>
    </details>
  );
}
