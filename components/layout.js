import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

import Navigation from "./navigation";
import Footer from "./footer";
import { GTM_ID, pageview } from "../utils/gtm";

const env = process.env.NODE_ENV;

const Layout = ({ children }) => {
  const router = useRouter();

  // Google analytics
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

      <Navigation />

      {children}

      <Footer />
    </>
  );
};

export default Layout;
