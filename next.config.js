module.exports = {
  i18n: {
    locales: ["en", "et"],
    defaultLocale: "et",
  },
  reactStrictMode: true,
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
};
