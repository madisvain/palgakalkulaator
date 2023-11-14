import "react-day-picker/dist/style.css";
import "styles/globals.css";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { useEffect } from "react";
import { useRouter } from "next/router";

// PostHog
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

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

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  });
}

function App({ Component, pageProps }) {
  useLinguiInit(pageProps.translation);

  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <>
      <PostHogProvider client={posthog}>
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

            <Navigation />
            <Component {...pageProps} />
            <Footer />
          </div>
        </I18nProvider>
      </PostHogProvider>
    </>
  );
}

export default App;
