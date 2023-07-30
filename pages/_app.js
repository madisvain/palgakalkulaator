import "react-day-picker/dist/style.css";
import "styles/globals.css";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";

import Layout from "components/layout";
import { useLinguiInit } from "utils/lingui";

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
  useLinguiInit(pageProps.translation);

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

          {/* Analytics */}
          <Analytics />
        </div>
      </I18nProvider>
    </>
  );
}

export default App;
