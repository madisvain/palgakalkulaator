import "react-day-picker/dist/style.css";
import "styles/globals.css";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Footer from "components/footer";
import Navigation from "components/navigation";
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

  return (
    <div className={`${inter.variable} ${general.variable}`}>
      <I18nProvider i18n={i18n}>
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

        <main className="min-h-screen flex flex-col justify-between">
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </main>
      </I18nProvider>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "14px",
            borderRadius: 0,
          },
        }}
      />
      <script defer data-domain="palgakalkulaator.ee" src="https://plausible.io/js/script.js"></script>
    </div>
  );
}

export default App;
