import "../styles/globals.css";

import { useEffect } from "react";
import { parseCookies } from "nookies";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import get from "lodash/get";

import Layout from "../components/layout";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const general = localFont({
  src: [
    {
      path: "../public/fonts/general/GeneralSans-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/general/GeneralSans-MediumItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/general/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/general/GeneralSans-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-general",
});

function App({ Component, pageProps }) {
  const cookies = parseCookies();
  const language = get(cookies, "language", "et");

  // i18n
  useEffect(() => {
    async function load(language) {
      const { messages } = await import(
        `@lingui/loader!../locale/${language}/messages.po`
      );

      i18n.load(language, messages);
      i18n.activate(language);
    }

    load(language);
  }, [language]);

  // Layout
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <I18nProvider i18n={i18n}>
        <div className={`${inter.variable} ${general.variable}`}>
          <div className="background">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </I18nProvider>
    </>
  );
}

export default App;
