import Head from "next/head";
import { t } from "@lingui/macro";
import { loadCatalog } from "utils/lingui";

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

export const getStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale);
  return {
    props: {
      translation,
    },
  };
};

export default Layout;
