import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/profil",
  "/visi-misi",
  "/guru",
  "/program",
  "/program/akademik",
  "/program/ekstrakurikuler",
  "/program/unggulan",
  "/fasilitas",
  "/galeri",
  "/berita",
  "/kontak",
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) {
    return [];
  }
  return routes.map((route) => ({
    url: `${site.url}${route === "" ? "/" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
