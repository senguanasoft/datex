import { defineConfig } from "vitepress";

export default defineConfig({
  title: "DateX",
  description: "A modern, lightweight, and customizable date range picker",
  base: "/",
  cleanUrls: true,

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#3b82f6" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en" }],
    [
      "meta",
      { property: "og:title", content: "DateX | Modern Date Range Picker" },
    ],
    ["meta", { property: "og:site_name", content: "DateX" }],
    ["meta", { property: "og:image", content: "/og-image.png" }],
    ["meta", { property: "og:url", content: "https://datex-docs.vercel.app/" }],
  ],

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API", link: "/api/options" },
      { text: "Examples", link: "/examples/basic" },
      { text: "Playground", link: "/playground" },
      {
        text: "v1.0.0",
        items: [
          { text: "Changelog", link: "/changelog" },
          { text: "Contributing", link: "/contributing" },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Installation", link: "/guide/installation" },
            { text: "Basic Usage", link: "/guide/basic-usage" },
          ],
        },
        {
          text: "Configuration",
          items: [
            { text: "Options", link: "/guide/options" },
            { text: "Themes", link: "/guide/themes" },
            { text: "Localization", link: "/guide/localization" },
            { text: "Events", link: "/guide/events" },
          ],
        },
        {
          text: "Advanced",
          items: [
            { text: "Custom Themes", link: "/guide/custom-themes" },
            { text: "Time Picker", link: "/guide/time-picker" },
            { text: "Accessibility", link: "/guide/accessibility" },
          ],
        },
      ],
      "/api/": [
        {
          text: "API Reference",
          items: [
            { text: "Options", link: "/api/options" },
            { text: "Methods", link: "/api/methods" },
            { text: "Events", link: "/api/events" },
            { text: "Types", link: "/api/types" },
          ],
        },
      ],
      "/examples/": [
        {
          text: "Examples",
          items: [
            { text: "Basic Usage", link: "/examples/basic" },
            { text: "With Ranges", link: "/examples/ranges" },
            { text: "Time Picker", link: "/examples/time-picker" },
            { text: "Custom Themes", link: "/examples/themes" },
            { text: "Framework Integration", link: "/examples/frameworks" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/senguanasoft/datex" },
      { icon: "npm", link: "https://www.npmjs.com/package/datex" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 DateX",
    },

    editLink: {
      pattern: "https://github.com/senguanasoft/datex/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    search: {
      provider: "local",
    },
  },

  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    lineNumbers: true,
  },
});
