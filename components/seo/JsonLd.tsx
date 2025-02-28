type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Renders a JSON-LD block. `<` is escaped so menu copy can never close the script tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
