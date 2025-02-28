import Link from "next/link";

/** Arched deco emblem: a doorway, a sunburst and the M. */
export function Emblem() {
  return (
    <svg className="emblem" viewBox="0 0 48 56" aria-hidden="true">
      <path d="M4 54V22a20 20 0 0 1 40 0v32" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 54V23a15 15 0 0 1 30 0v31"
        fill="none"
        stroke="currentColor"
        strokeWidth=".9"
        opacity=".6"
      />
      <g stroke="currentColor" strokeWidth=".9" opacity=".75">
        <path d="M24 8v8M14 12l4 6M34 12l-4 6M9 20l6 3M39 20l-6 3" />
      </g>
      <path
        d="M15 46V28l9 11 9-11v18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M4 54h40" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="The Marlowe, home">
      <Emblem />
      <span className="brand-word">
        <small>The</small>Marlowe
      </span>
    </Link>
  );
}
