import { JsonLd } from "@/components/seo/JsonLd";
import { buildHotelSchema } from "@/lib/schema";

export function HotelJsonLd() {
  return <JsonLd data={buildHotelSchema()} />;
}
