import { Fragment } from "react";
import { Trans } from "@lingui/macro";
import { Popover, Transition } from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";

import Link from "next/link";

const NEXT_PUBLIC_LIVE = process.env.NEXT_PUBLIC_LIVE;

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sum: 1000,
      type: "gross",
    },
  });
  const onSubmit = (data) => console.log(data);

  const navigation = [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ];

  const amount_types = [
    { id: "total", title: "Tööandja kulu" },
    { id: "gross", title: "Brutopalk" },
    { id: "net", title: "Netopalk" },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row mt-24 mb-28">
          <div className="basis-2/5">
            <div className="flex items-center relative w-[350px] h-[88px] bg-white rounded-[50px] shadow-sm pl-12 pr-20">
              <input
                type="number"
                placeholder="1000.00"
                className="border-transparent appearance-none h-[88px] w-full text-[56px] font-general text-right px-0"
              />
              <div className="pointer-events-none absolute inset-y-0 right-8 flex items-center text-[56px] font-general">
                €
              </div>
            </div>

            <fieldset className="mt-7">
              <legend className="sr-only">Notification method</legend>
              <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                {amount_types.map((amount_type) => (
                  <div key={amount_type.id} className="flex items-center">
                    <input
                      id={amount_type.id}
                      name="x"
                      type="radio"
                      defaultChecked={amount_type.id === "gross"}
                      className="h-4 w-4 border-gray-300 text-dark-blue focus:ring-transparent"
                    />
                    <label
                      htmlFor={amount_type.id}
                      className="ml-2 block text-sm font-semibold"
                    >
                      {amount_type.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-[72px] space-y-3">
              <legend>
                <h6>Mahaarvamised:</h6>
              </legend>
              <div className="flex items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="comments"
                  className="text-sm font-semibold ml-2"
                >
                  Sotsiaalmaksu min. kuumäär
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="comments"
                  className="text-sm font-semibold ml-2"
                >
                  Maksuvaba tulu{" "}
                  <span className="font-general text-lg leading-[1.3] px-2 py-1 border-b border-dark-blue">
                    654 €
                  </span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="comments"
                  className="text-sm font-semibold ml-2"
                >
                  Tööandja töötuskindlustusmakse (0.8%)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="comments"
                  className="text-sm font-semibold ml-2"
                >
                  Töötaja töötuskindlustusmakse (1.6%)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="comments"
                  className="text-sm font-semibold ml-2"
                >
                  Kogumispension (2%)
                </label>
              </div>
            </fieldset>
          </div>
          <div className="basis-3/5">
            <div className="pt-16 pb-12 px-16 bg-white">
              <table className="w-full border-separate border-spacing-y-3 mb-10">
                <tr>
                  <td>
                    <h4>Tööandja kulu</h4>
                  </td>
                  <td className="font-general text-2xl text-right">
                    1338.00 €
                  </td>
                </tr>
                <tr>
                  <td>Sotsiaalmaks</td>
                  <td className="text-right">330.00 €</td>
                </tr>
                <tr>
                  <td>Tööandja töötuskindlustusmakse</td>
                  <td className="text-right">8.00 €</td>
                </tr>
              </table>
              <table className="w-full border-separate border-spacing-y-3 mb-10">
                <tr>
                  <td>
                    <h4>Brutopalk</h4>
                  </td>
                  <td className="font-general text-2xl text-right">
                    1000.00 €
                  </td>
                </tr>
                <tr>
                  <td>Kogumispension</td>
                  <td className="text-right">20.00 €</td>
                </tr>
                <tr>
                  <td>Töötaja töötuskindlustusmakse</td>
                  <td className="text-right">16.00 €</td>
                </tr>
                <tr>
                  <td>Tulumaks</td>
                  <td className="text-right">62.00 €</td>
                </tr>
              </table>
              <table className="w-full border-separate border-spacing-y-3">
                <tr>
                  <td>
                    <h4>Netopalk</h4>
                  </td>
                  <td className="font-general text-2xl text-right">902.00 €</td>
                </tr>
              </table>
            </div>
            <button
              type="button"
              className="flex justify-center items-center w-full h-[66px] bg-green font-semibold"
            >
              Koosta palgateatis
              <div className="inline ml-2">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.293 0.292969L5.99997 4.58597L1.70697 0.292969L0.292969 1.70697L5.99997 7.41397L11.707 1.70697L10.293 0.292969Z"
                    fill="#181A33"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row pt-24">
            <div className="basis-2/5">
              <img src="./taxes.svg" alt="Taxes" />
            </div>
            <div className="basis-3/5">
              <h4 className="mb-6">Maksuinfo 2023</h4>
              <ul className="list-inside list-disc font-light space-y-4">
                <li>
                  Tulumaksu kinnipidamise määr on{" "}
                  <strong className="font-bold">20%</strong>{" "}
                  <Link
                    href="#"
                    className="font-semibold text-xs underline underline-offset-4"
                  >
                    TMS § 4 lg 1
                  </Link>
                </li>
                <li>
                  Maksuvaba tulu varieeruv 0...7848 / 12 ={" "}
                  <strong>0...654 EUR/kuus</strong> TMS § 23 lg 1 ja lg 2
                </li>
                <li>Sotsiaalmaksu määr on 33% SMS § 7 lg 1</li>
                <li>
                  Sotsiaalmaksu kuumäär on <strong>654 EUR</strong>, st
                  sotsiaalmaksu minimaalne kohustus on 654 x 0.33 ≈{" "}
                  <strong>216 EUR/kuus</strong>
                  2023 RES § 2 lg 7, SMS § 2 lg 2, SMS § 21
                </li>
                <li>Töötuskindlustusmakse määrad on:</li>
                <ul>
                  <li>
                    töötajale <strong>1.6%</strong> VV määrus 15.09.2022 nr 88
                  </li>
                  <li>
                    tööandjale <strong>0.8%</strong> VV määrus 15.09.2022 nr 88
                  </li>
                </ul>
                <li>
                  Kogumispensioni makse määr on <strong>liitunutele 2%</strong>{" "}
                  ja <strong>mitteliitunutele 0%</strong>. Kogumispensioniga
                  liitumist saab kontrollida{" "}
                  <Link href="#">
                    <strong>siit</strong>
                  </Link>{" "}
                  KPS § 9
                </li>
                <li>
                  Töötasu alammäär (miinimumpalk) on:
                  <ul>
                    <li>
                      kuus <strong>725 EUR</strong> VV määrus 09.12.2022 nr 124
                    </li>
                    <li>
                      tunnis <strong>4.3 EUR</strong> VV määrus 09.12.2022 nr
                      124
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
