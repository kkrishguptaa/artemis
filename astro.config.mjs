// @ts-check
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import remarkGithub from "remark-github";

export default defineConfig({
  site: "https://devlogs.krishg.com",

  integrations: [sitemap()],

  adapter: vercel({
    imageService: false,
    devImageService: "sharp",
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
      wrap: true,
    },
    remarkPlugins: [[remarkGithub, { repository: "kkrishguptaa/artemis" }]],
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Mona Sans",
        display: "swap",
        subsets: ["latin"],
        weights: ["400", "700"],
        fallbacks: ["Fira Sans", "Geist", "Inter", "sans-serif"],
        cssVariable: "--font-mona-sans",
      },
      {
        provider: fontProviders.google(),
        name: "Fira Code",
        display: "swap",
        subsets: ["latin"],
        fallbacks: [
          "Cascadia Code",
          "JetBrains Mono",
          "Geist Mono",
          "Space Mono",
          "Inconsolata",
          "monospace",
        ],
        cssVariable: "--font-fira-code",
      },
    ],
    contentIntellisense: true,
  },
});
