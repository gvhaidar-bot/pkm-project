import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "MTs Nurul Falah",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EA",
    theme_color: site.themeColor,
  };
}
