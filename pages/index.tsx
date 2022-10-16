import { Fragment } from "react";
import type { NextPage } from "next";
import { Popover, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  sum: number;
  type: string;
};

const NEXT_PUBLIC_LIVE = process.env.NEXT_PUBLIC_LIVE;

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      sum: 1000,
      type: "gross",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const navigation = [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ];

  const types = [
    { id: "total", title: "Tööandja kulu" },
    { id: "gross", title: "Brutopalk" },
    { id: "net", title: "Netopalk" },
  ];

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Palgakalkulaator
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-xl text-red-500 p-2 border-solid border-red-500 border-2 inline-block">
              Avame varsti
            </p>
            <p className="mx-auto mt-10 max-w-xl text-xl text-gray-500">
              Arvuta palgakalkulaatoriga maksud ja saada palgalehed.
            </p>
          </div>
        </div>
      </div>

      {NEXT_PUBLIC_LIVE === "true" && (
        <>
          <div className="bg-slate-200 pt-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-4xl rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-row">
                    {/* Sum */}
                    <div className="basis-1/2">
                      <div className="mt-4">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Summa
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm max-w-sm">
                          <input
                            type="number"
                            min="0"
                            className="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="1000"
                            aria-describedby="price-currency"
                            {...register("sum")}
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span
                              className="text-gray-500 sm:text-sm"
                              id="price-currency"
                            >
                              EUR
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sum type */}
                    <div className="basis-1/2">
                      <fieldset className="mt-10">
                        <div className="space-y-4">
                          {types.map((type) => (
                            <div key={type.id} className="flex items-center">
                              <input
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                value={type.id}
                                {...register("type")}
                              />
                              <label
                                htmlFor={type.id}
                                className="ml-3 block text-sm font-normal text-gray-700"
                              >
                                {type.title}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Mahaarvamised
                    </h3>
                    <fieldset className="space-y-5">
                      <legend className="sr-only">Mahaarvamised</legend>
                      <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="comments"
                            aria-describedby="comments-description"
                            name="comments"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="comments"
                            className="font-normal text-gray-700"
                          >
                            Arvesta sotsiaalmaksu min. kuumäära alusel
                            <Popover className="relative inline ml-2 float-right">
                              <Popover.Button>
                                <QuestionMarkCircleIcon className="h-5" />
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute left-1/2 z-10 mt-1 w-80 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative gap-8 bg-white p-4">
                                      <p className="text-gray-500">
                                        Sotsiaalmaksuseaduse § 21 alusel
                                        kehtestatav sotsiaalmaksu maksmise
                                        aluseks olev{" "}
                                        <a href="https://www.riigiteataja.ee/akt/RES2021#para2lg7">
                                          kuumäär
                                        </a>{" "}
                                        on 2021.-2022 aastal 584 eurot, seega
                                        sotsiaalmaksu minimaalne kohustus on
                                        192,72 eurot kuus. Vt. täpsemalt
                                        <a href="https://www.riigiteataja.ee/akt/123122013060?leiaKehtiv">
                                          sotsiaalmaksuseadusest
                                        </a>
                                        .
                                      </p>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </Popover>
                          </label>
                        </div>
                      </div>

                      <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="candidates"
                            aria-describedby="candidates-description"
                            name="candidates"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="candidates"
                            className="font-normal text-gray-700"
                          >
                            Arvesta maksuvaba tulu
                            <Popover className="relative inline ml-2 float-right">
                              <Popover.Button>
                                <QuestionMarkCircleIcon className="h-5" />
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute left-1/2 z-10 mt-1 w-96 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative gap-8 bg-white p-4">
                                      <p className="font-normal text-gray-500">
                                        Eesti residendist füüsilise isiku
                                        maksustamisperioodi tulust maha arvatav
                                        maksuvaba tulu.
                                        <br />
                                        <br />
                                        Aastatuluga kuni 14 400 eurot on
                                        maksuvaba tulu 6000 eurot aastas.
                                        <br />
                                        <br />
                                        Aastatulu kasvades 14 400 eurolt 25 200
                                        euroni väheneb maksuvaba tulu vastavalt
                                        valemile 6000 – 6000 ÷ 10 800 × (tulu
                                        summa – 14 400).
                                        <br />
                                        <br />
                                        Aastatuluga üle 25 200 euro on maksuvaba
                                        tulu 0.
                                        <br />
                                        <br />
                                        Vt. ka{" "}
                                        <a href="https://www.riigiteataja.ee/akt/117122015023?leiaKehtiv#para23">
                                          tulumaksuseadus (TuMS) § 23
                                        </a>
                                        .
                                        <br />
                                        <br />
                                        Töötasumuutus
                                        <br />
                                        <br />
                                        Kui soovite arvutada kui palju kasvavad
                                        tööandja kulud näiteks brutotöötasu
                                        tõstmisel või kui palju tõuseb töötaja
                                        netopalk kui brutopalga tõus on näiteks
                                        50 eurot, siis jätke väli «Arvesta
                                        maksuvaba tulu» tühjaks ning sisestage
                                        lähteandmetesse ainult palgamuutuse
                                        summa.
                                      </p>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </Popover>
                          </label>
                        </div>
                      </div>

                      <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="offers"
                            aria-describedby="offers-description"
                            name="offers"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="offers"
                            className="font-normal text-gray-700"
                          >
                            Tööandja töötuskindlustusmakse (0,8%)
                            <Popover className="relative inline ml-2 float-right">
                              <Popover.Button>
                                <QuestionMarkCircleIcon className="h-5" />
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute left-1/2 z-10 mt-1 w-80 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative gap-8 bg-white p-4">
                                      <p className="text-gray-500">
                                        Töötuskindlustusmakse määrad
                                        sätestatakse töötuskindlustuse seaduse §
                                        41 lõike 4 alusel Vabariigi Valitsuse
                                        määrusega.
                                        <br />
                                        <br />
                                        Tööandja töötuskindlustusmakse määr
                                        2020–2023. aastal on 0,8%
                                        <br />
                                        <br />
                                        Töötaja (kindlustatu)
                                        töötuskindlustusmakse määr 2020–2023.
                                        aastal on 1,6%
                                        <br />
                                        <br />
                                        Töötuskindlustuse seaduse kohaselt on
                                        antud makse maksjateks s.h. töötaja,
                                        avalik teenistuja, võlaõigusliku lepingu
                                        alusel teenust osutav füüsiline isik.
                                        Töötaja ja tööandja makse määrad
                                        järgmiseks kalendriaastaks kehtestab
                                        Vabariigi Valitsus hiljemalt jooksva
                                        kalendriaasta 1. detsembriks.
                                        <br />
                                        <br />
                                        NB! Juhul kui töötaja (kindlustatu) on
                                        jõudnud vanaduspensioniikka või talle on
                                        määratud riikliku pensionikindlustuse
                                        seaduse §-s 9 sätestatud ennetähtaegne
                                        vanaduspension, arvestatakse töötajale
                                        töötuskindlustusmakset üksnes tööandjale
                                        kehtestatud määras.
                                      </p>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </Popover>
                          </label>
                        </div>
                      </div>

                      <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="offers"
                            aria-describedby="offers-description"
                            name="offers"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="offers"
                            className="font-normal text-gray-700"
                          >
                            Töötaja (kindlustatu) töötuskindlustusmakse (1,6%)
                          </label>
                        </div>
                      </div>

                      <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="offers"
                            aria-describedby="offers-description"
                            name="offers"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="offers"
                            className="font-normal text-gray-700"
                          >
                            Kogumispension II sammas (2%)
                            <Popover className="relative inline ml-2 float-right">
                              <Popover.Button>
                                <QuestionMarkCircleIcon className="h-5" />
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute left-1/2 z-10 mt-1 w-80 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative gap-8 bg-white p-4">
                                      <p className="text-gray-500">
                                        Makset on kohustatud tasuma
                                        kogumispensioni II sambaga
                                        vabatahtlikult liitunud või seadusega
                                        kohustatud residendist füüsiline isik
                                        (kes on esitanud maksete jätkamise
                                        avalduse), kui tema elukoht on Eestis
                                        või kui ta viibib Eestis 12 järjestikuse
                                        kalendrikuu jooksul vähemalt 183 päeva.
                                        Makse määraks on 2% kogumispensionide
                                        seaduse § 7 lõikes 1 nimetatud
                                        summadelt.
                                      </p>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </Popover>
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="bg-slate-200 pt-12 pb-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-4xl rounded-lg bg-white shadow">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr className="border-t border-gray-200">
                              <th
                                colSpan={5}
                                scope="colgroup"
                                className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                              >
                                Töötaja palk ja maksud
                              </th>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Brutopalk
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Töötuskindlustus (töötaja) (1.6%)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Kogumispension (2%) 20,00 € 2,0%
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Tulumaks (20%)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Netosumma (kätte)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>

                            <tr className="border-t border-gray-200">
                              <th
                                colSpan={5}
                                scope="colgroup"
                                className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                              >
                                Tööandja kulud ja maksud
                              </th>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Kogukulu tööandjale
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Brutopalk
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Sotsiaalmaks (33%)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Töötuskindlustus (tööandja) (0.8%)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>

                            <tr className="border-t border-gray-200">
                              <th
                                colSpan={5}
                                scope="colgroup"
                                className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                              >
                                Rahade jaotus
                              </th>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Kogukulu tööandjale
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Töötajale (netosumma kätte)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-6">
                                Maksuametile (kõik maksud)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-sm font-normal">
                                1000
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-normal text-gray-500">
                                10%
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <footer className="fixed bottom-0 w-full">
        <div className="mx-auto max-w-7xl overflow-hidden py-6 px-4 sm:px-6 lg:px-8">
          {NEXT_PUBLIC_LIVE === "true" && (
            <nav
              className="-mx-5 -my-2 flex flex-wrap justify-center"
              aria-label="Footer"
            >
              {navigation.map((item) => (
                <div key={item.name} className="px-5 py-2">
                  <a
                    href={item.href}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>
          )}
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()}
            <a
              href="https://www.arveldaja.com/"
              className="ml-2 text-[#4ddb94]"
            >
              Arveldaja OÜ
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
