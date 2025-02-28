import { Brand } from "@/components/layout/Brand";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLinks } from "@/components/layout/NavLinks";
import { Topbar } from "@/components/layout/Topbar";
import { ButtonLink } from "@/components/ui/Button";
import { BOOK_ROOM_HREF, BOOK_TABLE_HREF, primaryNav } from "@/lib/data/nav";

export function Header() {
  return (
    <>
      <Topbar />
      <header className="site-header">
        <div className="wrap bar">
          <Brand />
          <nav className="nav" aria-label="Primary">
            <NavLinks links={primaryNav} />
          </nav>
          <div className="header-cta">
            <ButtonLink href={BOOK_TABLE_HREF} variant="ghost">
              Book a table
            </ButtonLink>
            <ButtonLink href={BOOK_ROOM_HREF}>Book a room</ButtonLink>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
