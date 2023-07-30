import Head from "next/head";
import { t } from "@lingui/macro";

import Navigation from "./navigation";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Palgakalkulaator</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          description={t`
              Palgakalkulaator aitab arvestada netopalga, brutopalga, tööandja
              kulu, maksud ja luua töötajale palgalehe.`}
        />
      </Head>

      <Navigation />

      {children}

      <Footer />
    </>
  );
};

export default Layout;
