import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/rooms", changeFrequency: "weekly", priority: 0.9 },
  { path: "/dining", changeFrequency: "weekly", priority: 0.9 },
  { path: "/events", changeFrequency: "monthly", priority: 0.8 },
  { path: "/visit", changeFrequency: "monthly", priority: 0.7 },
] as const satisfies readonly {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
