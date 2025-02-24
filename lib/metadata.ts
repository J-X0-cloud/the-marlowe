import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/** Page-level metadata with matching Open Graph tags and a canonical URL. */
export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}
