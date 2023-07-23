import Link from "next/link";

const TaxInfo = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row pt-24 pb-32 items-center">
          <div className="basis-2/5">
            <img src="./taxes.svg" alt="Taxes" />
          </div>
          <div className="basis-3/5">
            <h4 className="mb-6">Maksuinfo 2023</h4>
            <ul className="list-outside list-disc space-y-4 ml-4">
              <li>
                Tulumaksu kinnipidamise määr on{" "}
                <strong className="font-bold">20%</strong>{" "}
                <a
                  href="https://www.riigiteataja.ee/akt/128122017077?leiaKehtiv#para4lg1"
                  className="font-semibold text-xs underline underline-offset-4"
                  target="_blank"
                >
                  TMS § 4 lg 1
                </a>
              </li>
              <li>
                Maksuvaba tulu varieeruv 0...7848 / 12 ={" "}
                <strong>0...654 EUR/kuus</strong>{" "}
                <a
                  href="https://www.riigiteataja.ee/akt/128122017077?leiaKehtiv#para23"
                  className="font-semibold text-xs underline underline-offset-4"
                  target="_blank"
                >
                  TMS § 23 lg 1 ja lg 2
                </a>
              </li>
              <li>
                Sotsiaalmaksu määr on 33%{" "}
                <a
                  href="https://www.riigiteataja.ee/akt/128122017076?leiaKehtiv#para7lg1"
                  className="font-semibold text-xs underline underline-offset-4"
                  target="_blank"
                >
                  SMS § 7 lg 1
                </a>
              </li>
              <li>
                Sotsiaalmaksu kuumäär on <strong>654 EUR</strong>, st
                sotsiaalmaksu minimaalne kohustus on 654 x 0.33 ={" "}
                <strong>215,82 EUR/kuus</strong>{" "}
                <a
                  href="https://www.riigiteataja.ee/akt/128122017076?leiaKehtiv#para2lg2"
                  className="font-semibold text-xs underline underline-offset-4"
                  target="_blank"
                >
                  2023 RES § 2 lg 7, SMS § 2 lg 2, SMS § 21
                </a>
              </li>
              <li>
                Töötuskindlustusmakse määrad on:
                <ul className="list-outside list-disc ml-8">
                  <li>
                    töötajale <strong>1.6%</strong>{" "}
                    <a
                      href="https://www.riigiteataja.ee/akt/117092022003?leiaKehtiv#para2"
                      className="font-semibold text-xs underline underline-offset-4"
                      target="_blank"
                    >
                      VV määrus 15.09.2022 nr 88
                    </a>
                  </li>
                  <li>
                    tööandjale <strong>0.8%</strong>{" "}
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
                Kogumispensioni makse määr on <strong>liitunutele 2%</strong> ja{" "}
                <strong>mitteliitunutele 0%</strong>. Kogumispensioniga
                liitumist saab kontrollida{" "}
                <a
                  href="https://www.pensionikeskus.ee/raamatupidajale/ii-sammas/liitumiskontroll/"
                  className="underline underline-offset-4"
                  target="_blank"
                >
                  <strong>siit</strong>
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
                Töötasu alammäär (miinimumpalk) on:
                <ul className="list-outside list-disc ml-8">
                  <li>
                    kuus <strong>725 EUR</strong>{" "}
                    <a
                      href="https://www.riigiteataja.ee/akt/113122022033"
                      className="font-semibold text-xs underline underline-offset-4"
                      target="_blank"
                    >
                      VV määrus 09.12.2022 nr 124
                    </a>
                  </li>
                  <li>
                    tunnis <strong>4.3 EUR</strong>{" "}
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
