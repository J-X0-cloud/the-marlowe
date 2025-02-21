/** Brass diamond divider used under section headings. */
export function Deco() {
  return (
    <div className="deco" aria-hidden="true">
      <span />
      <svg viewBox="0 0 40 12">
        <path d="M20 1l5 5-5 5-5-5z" fill="currentColor" />
        <path d="M4 6h8M28 6h8" stroke="currentColor" />
      </svg>
      <span />
    </div>
  );
}
