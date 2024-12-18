import React, { useEffect } from "react";
import Head from "next/head";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import flatMap from "lodash/flatMap";
import filter from "lodash/filter";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import values from "lodash/values";

import { getHolidaysByMonth, getWorkingdaysByMonth, getWorkingHoursByMonth } from "utils/holidays";
import { loadCatalog } from "utils/lingui";

import "dayjs/locale/en";
import "dayjs/locale/et";

import localeData from "dayjs/plugin/localeData";
dayjs.extend(localeData);

const FreeDays = ({ setYear }) => {
  useLingui();
  const router = useRouter();

  // Set year 2024
  useEffect(() => {
    setYear(2024);
  }, []);

  dayjs.locale(router.locale);

  const months = dayjs.months();
  const holidays = getHolidaysByMonth(2024);
  const workingDays = getWorkingdaysByMonth(2024);
  const workingHours = getWorkingHoursByMonth(2024);

  const holidaysOnWorkingDays = filter(flatMap(holidays), "isWorkday").length;

  return (
    <>
      <Head>
        <title>{t`Vabad päevad ja tööajafond 2024`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={t`Palgakalkulaator aitab arvestada netopalga, brutopalga, tööandja kulu, maksud ja luua kerge vaevaga töötajale saatmiseks palgalehe.`}
        />
        <link rel="icon" href="/favicon.svg" />

        {/* Open Graph */}
        <meta property="og:title" content={t`Vabad päevad ja tööajafond 2024`} />
        <meta
          property="og:description"
          content={t`Palgakalkulaator aitab arvestada netopalga, brutopalga, tööandja kulu, maksud ja luua kerge vaevaga töötajale saatmiseks palgalehe.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.palgakalkulaator.ee/vabad-paevad-ja-tooajafond" />

        {/* Hreflang */}
        <link rel="alternate" hrefLang="et" href="https://www.palgakalkulaator.ee/vabad-paevad-ja-tooajafond" />
        <link rel="alternate" hrefLang="en" href="https://www.palgakalkulaator.ee/en/vabad-paevad-ja-tooajafond" />
        <link rel="alternate" hrefLang="x-default" href="https://www.palgakalkulaator.ee/vabad-paevad-ja-tooajafond" />

        {/* Canonical */}
        <link
          rel="canonical"
          href={
            router.locale == "en"
              ? `https://www.palgakalkulaator.ee/en/vabad-paevad-ja-tooajafond`
              : `https://www.palgakalkulaator.ee/vabad-paevad-ja-tooajafond`
          }
        />

        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: t`Palgakalkulaator - arvuta palk ja maksud 2024`,
              description: t`Palgakalkulaator aitab arvutada palga ja maksud (netopalga, brutopalga, tööandja kulu) ja luua palgalehe.`,
              url: "https://www.palgakalkulaator.ee/",
              image: "https://www.palgakalkulaator.ee/og-image.png",
              applicationCategory: "BusinessApplication",
              operatingSystem: "All",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                ratingCount: "1",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
            }),
          }}
        />
      </Head>

      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h4 className="mb-6">
          <Trans>Vabad päevad ja tööajafond 2024</Trans>
        </h4>
        <p className="my-6">
          <Trans>
            Aastal 2024 on riigipühadest tulenevalt <strong>{sumBy(values(holidays), "length")}</strong> vaba päeva,
            millest <strong>{holidaysOnWorkingDays}</strong> on tööpäevadel.
          </Trans>
        </p>
        <p className="my-6">
          <Trans>
            Tööpäevi on kokku <strong>{sumBy(values(workingDays), "length")}</strong> ja{" "}
            <strong>{sumBy(values(workingHours))}</strong> töötundi tööajafondi.
          </Trans>
        </p>
        <table className="w-full border border-collapse border-dark-blue mb-6">
          <thead>
            <tr>
              <th className="border border-dark-blue bg-white text-left px-2 py-2">
                <Trans>Kuu</Trans>
              </th>
              <th className="border border-dark-blue bg-white text-left px-2 py-2">
                <Trans>Riigipüha</Trans>
              </th>
              <th className="border border-dark-blue bg-white text-left px-2 py-2">
                <Trans>Tööpäevi (tööaeg E-R)</Trans>
              </th>
              <th className="border border-dark-blue bg-white text-left px-2 py-2">
                <Trans>Töötunde (tööaeg 9-17)</Trans>
              </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td
                className="border border-transparent border-r-dark-blue text-right px-4 py-2 bg-transparent"
                colSpan="2"
              >
                <strong>
                  <Trans>Kokku</Trans>
                </strong>
              </td>
              <td className="border border-dark-blue bg-white px-2 py-2">
                <strong className="mr-1">{sumBy(values(workingDays), "length")}</strong>
                <Trans>tööpäeva</Trans>
              </td>
              <td className="border border-dark-blue bg-white px-2 py-2">
                <strong className="mr-1">{sumBy(values(workingHours))}</strong>
                <Trans>töötundi</Trans>
              </td>
            </tr>
          </tfoot>
          <tbody>
            {months.map((month, index) => {
              return (
                <tr className={index === dayjs().month() && dayjs().year() === 2024 ? "bg-blue-100" : "bg-white"}>
                  <td className="border border-dark-blue px-2 py-2">{month}</td>
                  <td className="border border-dark-blue px-2 py-2">
                    <ul className="list-inside list-none">
                      {get(holidays, index + 1, []).map((holiday) => (
                        <li>
                          {holiday.date.format("DD.")} {holiday.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-dark-blue px-2 py-2">{get(workingDays, index + 1).length}</td>
                  <td className="border border-dark-blue px-2 py-2">{get(workingHours, index + 1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 pt-12 pb-16 lg:pt-24 lg:pb-32 items-center border-b border-b-[#E9E7E5]">
            <div className="basis-2/5">
              <img src="/taxes.svg" alt="Taxes" height={389} width={389} />
            </div>
            <div className="basis-3/5">
              <h4 className="mb-6">
                <Trans>Vabad ja lühendatud tööpäevad 2024</Trans>
              </h4>
              <p className="mb-4">
                <Trans>
                  Vabade päevade tabel on koostatud{" "}
                  <a
                    href="https://www.riigiteataja.ee/akt/898484?leiaKehtiv"
                    className="font-semibold underline underline-offset-4"
                    target="_blank"
                  >
                    Pühade ja tähtpäevade seaduse
                  </a>{" "}
                  alusel.
                </Trans>
              </p>
              <p className="mb-8">
                <Trans>
                  Töötundide arvutuses on arvestatud lühendatud tööpäevadega vastavalt{" "}
                  <a
                    href="https://www.riigiteataja.ee/akt/13319829#para53"
                    className="font-semibold underline underline-offset-4"
                    target="_blank"
                  >
                    töölepingu seaduse § 53
                  </a>{" "}
                  ja pühade ja tähtpäevade seadusest lühendatakse eelnevat tööpäeva kolme tunni võrra järgnevatel
                  pühadel:
                </Trans>
              </p>
              <ul className="list-disc list-inside">
                <li>
                  <Trans>uusaasta</Trans>
                </li>
                <li>
                  <Trans>Eesti Vabariigi aastapäev</Trans>
                </li>
                <li>
                  <Trans>võidupüha</Trans>
                </li>
                <li>
                  <Trans>jõululaupäev</Trans>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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

export default FreeDays;
