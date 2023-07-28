import "../styles/globals.css";

import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import Head from "next/head";
import Script from "next/script";

import { GTM_ID, pageview } from "../utils/gtm";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Palgakalkulaator</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Arvuta palgakalkulaatoriga maksud ja saada palgalehed."
        />
      </Head>

      {/* Google Tag Manager */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      ></Script>
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-11W0BWKSY3', {
            page_path: window.location.pathname,
          });
          `,
        }}
      />

      <Component {...pageProps} />

      {/* Analytics */}
      <Analytics />
    </>
  );
}

export default App;
