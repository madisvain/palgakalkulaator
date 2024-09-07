import { Trans } from "@lingui/macro";

const TaxInfo = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 pt-12 pb-16 lg:pt-24 lg:pb-32 items-center border-b border-b-[#E9E7E5]">
          <div className="basis-2/5">
            <img src="./taxes.svg" alt="Taxes" height={389} width={389} />
          </div>
          <div className="basis-3/5">
            <h4 className="mb-6">
              <Trans>Maksuinfo 2024</Trans>
            </h4>
            <ul className="list-outside list-disc space-y-4 ml-4">
              <li>
                <Trans>Tulumaksu kinnipidamise määr on</Trans> <strong className="font-bold">20%</strong>{" "}
                <a
                  href="https://www.riigiteataja.ee/akt/128122017077?leiaKehtiv#para4lg1"
                  className="font-semibold text-xs underline underline-offset-4"
                  target="_blank"
                >
                  TMS § 4 lg 1
                </a>
              </li>
              <li>
                <Trans>Maksuvaba tulu varieeruv 0...7848 / 12 =</Trans>{" "}
                <strong>
                  <Trans>0...654 EUR/kuus</Trans>
                </strong>{" "}
                <a
                  href="https://www.riigiteataja.ee/akt/128122017077?leiaKehtiv#para23"
                  className="font-semibold text-xs underline underline-offset-4"
                  target="_blank"
                >
                  TMS § 23 lg 1 ja lg 2
                </a>
              </li>
              <li>
                <Trans>Sotsiaalmaksu määr on 33%</Trans>{" "}
                <a
                  href="https://www.riigiteataja.ee/akt/128122017076?leiaKehtiv#para7lg1"
                  className="font-semibold text-xs underline underline-offset-4"
                  target="_blank"
                >
                  SMS § 7 lg 1
                </a>
              </li>
              <li>
                <Trans>
                  Sotsiaalmaksu minimaalne kohustus Töölepingu puhul on <strong>725 EUR</strong> x 0,33% =
                </Trans>{" "}
                <strong>
                  <Trans>239,25 EUR/kuus</Trans>
                </strong>{" "}
                <a
                  href="https://www.riigiteataja.ee/akt/128122017076?leiaKehtiv#para2lg2"
                  className="font-semibold text-xs underline underline-offset-4"
                  target="_blank"
                >
                  2023 RES § 2 lg 7, SMS § 2 lg 2, SMS § 21
                </a>
              </li>
              <li>
                <Trans>Töötuskindlustusmakse määrad on:</Trans>
                <ul className="list-outside list-disc ml-8">
                  <li>
                    <Trans>
                      töötajale <strong>1.6%</strong>
                    </Trans>{" "}
                    <a
                      href="https://www.riigiteataja.ee/akt/117092022003?leiaKehtiv#para2"
                      className="font-semibold text-xs underline underline-offset-4"
                      target="_blank"
                    >
                      VV määrus 15.09.2022 nr 88
                    </a>
                  </li>
                  <li>
                    <Trans>
                      tööandjale <strong>0.8%</strong>
                    </Trans>{" "}
                    <a
                      href="https://www.riigiteataja.ee/akt/117092022003?leiaKehtiv#para2"
                      className="font-semibold text-xs underline underline-offset-4"
                      target="_blank"
                    >
                      VV määrus 15.09.2022 nr 88
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <Trans>
                  Kogumispensioni makse määr on <strong>liitunutele 2%</strong> ja <strong>mitteliitunutele 0%</strong>.
                  Kogumispensioniga liitumist saab kontrollida
                </Trans>{" "}
                <a
                  href="https://www.pensionikeskus.ee/raamatupidajale/ii-sammas/liitumiskontroll/"
                  className="underline underline-offset-4"
                  target="_blank"
                >
                  <strong>
                    <Trans>siit</Trans>
                  </strong>
                </a>{" "}
                <a
                  href="https://www.riigiteataja.ee/akt/107122018011?leiaKehtiv#para9"
                  className="font-semibold text-xs underline underline-offset-4"
                  target="_blank"
                >
                  KPS § 9
                </a>
              </li>
              <li>
                <Trans>Töötasu alammäär (miinimumpalk) on:</Trans>
                <ul className="list-outside list-disc ml-8">
                  <li>
                    <Trans>
                      kuus <strong>820 EUR</strong>
                    </Trans>{" "}
                    <a
                      href="https://www.riigiteataja.ee/akt/113122022033"
                      className="font-semibold text-xs underline underline-offset-4"
                      target="_blank"
                    >
                      VV määrus 09.12.2022 nr 124
                    </a>
                  </li>
                  <li>
                    <Trans>
                      tunnis <strong>4.86 EUR</strong>
                    </Trans>{" "}
                    <a
                      href="https://www.riigiteataja.ee/akt/113122022033"
                      className="font-semibold text-xs underline underline-offset-4"
                      target="_blank"
                    >
                      VV määrus 09.12.2022 nr 124
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxInfo;
