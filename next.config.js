module.exports = {
  i18n: {
    locales: ["en", "et"],
    defaultLocale: "et",
    localeDetection: false,
  },
  reactStrictMode: true,
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
};
