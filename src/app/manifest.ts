import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

/** PWA manifest baseline — makes the site installable (future-ready). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05070d",
    theme_color: "#05070d",
    lang: "ml",
    categories: ["news", "technology", "education"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
