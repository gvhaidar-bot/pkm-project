import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const hasil: MetadataRoute.Robots = {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login", "/api/"],
    },
  };
  if (site.url) {
    hasil.sitemap = `${site.url}/sitemap.xml`;
  }
  return hasil;
}
