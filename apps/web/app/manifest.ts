import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Relique - Probabilistic Authentication for Collectibles",
    short_name: "Relique",
    description: "Trusted authentication for memorabilia and collectibles",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#1e3a8a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

