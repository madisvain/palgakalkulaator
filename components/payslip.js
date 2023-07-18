import { Trans } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";

import dayjs from "dayjs";
import Link from "next/link";

import "dayjs/locale/et";

dayjs.locale("et");

const Payslip = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: `Palgaleht ${dayjs().subtract(1, "month").format("MMMM YYYY")}`,
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row pt-24 pb-28 px-16">
          <div className="bg-white w-full py-28 px-20">
            <div className="flex flex-row gap-8 items-center mb-12">
              <div className="basis-1/2">
                <input
                  {...register("title")}
                  type="text"
                  className="border-transparent bg-beige w-full h-12 font-semibold text-3xl"
                />
              </div>
              <div className="basis-1/2"></div>
            </div>
            <div className="flex flex-row gap-8">
              <div className="basis-1/2">
                <div className="flex flex-row gap-4 items-center mb-3">
                  <div className="basis-1/2 text-right text-dark-blue opacity-40 font-general font-semibold">
                    <Trans>Tööandja</Trans>
                  </div>
                  <div className="basis-1/2">
                    <input
                      {...register("employer")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center mb-3">
                  <div className="basis-1/2 text-right text-dark-blue opacity-40 font-general font-semibold">
                    <Trans>Töötaja</Trans>
                  </div>
                  <div className="basis-1/2">
                    <input
                      {...register("employee")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center mb-3">
                  <div className="basis-1/2 text-right text-dark-blue opacity-40 font-general font-semibold">
                    <Trans>Isikukood</Trans>
                  </div>
                  <div className="basis-1/2">
                    <input
                      {...register("personalCode")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <div className="basis-1/2 text-right text-dark-blue opacity-40 font-general font-semibold">
                    <Trans>Kuupäev</Trans>
                  </div>
                  <div className="basis-1/2">
                    <input
                      {...register("date")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                </div>
              </div>
              <div className="basis-1/2">
                <h6 className="font-semibold mb-6">
                  <Trans>Kinni peetud:</Trans>
                </h6>
                <div className="flex flex-row mb-3">
                  <div className="grow font-semibold leading-relaxed text-base">
                    <Trans>Kogumispension</Trans>
                  </div>
                  <div className="font-semibold leading-relaxed text-base">
                    20.00 EUR
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="grow font-semibold leading-relaxed text-base">
                    <Trans>Töötaja töötuskindlustusmakse</Trans>
                  </div>
                  <div className="font-semibold leading-relaxed text-base">
                    16.00 EUR
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="grow font-semibold leading-relaxed text-base">
                    <Trans>Tulumaks</Trans>
                  </div>
                  <div className="font-semibold leading-relaxed text-base">
                    62.00 EUR
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="grow font-semibold leading-relaxed text-base">
                    <Trans>Sotsiaalmaks</Trans>
                  </div>
                  <div className="font-semibold leading-relaxed text-base">
                    330.00 EUR
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="grow font-semibold leading-relaxed text-base">
                    <Trans>Tööandja töötuskindlustusmakse</Trans>
                  </div>
                  <div className="font-semibold leading-relaxed text-base">
                    8.00 EUR
                  </div>
                </div>
              </div>
            </div>

            {/* Payslip rows
            <div className="flex flex-row gap-4 mt-28 mb-2">
              <div className="basis-1/2 font-semibold leading-relaxed opacity-40 text-sm">
                Tasu liik*
              </div>
              <div className="basis-1/2">
                <div className="flex flex-row gap-4">
                  <div className="basis-1/6 font-semibold leading-relaxed opacity-40 text-sm text-right">
                    Aeg
                  </div>
                  <div className="basis-1/6 font-semibold leading-relaxed opacity-40 text-sm text-right">
                    Ühik
                  </div>
                  <div className="basis-2/6 font-semibold leading-relaxed opacity-40 text-sm text-right">
                    Ühiku hind
                  </div>
                  <div className="basis-2/6 font-semibold leading-relaxed opacity-40 text-sm text-right">
                    Summa*
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="basis-1/2">
                <input
                  {...register("personalCode")}
                  type="text"
                  className="border-transparent bg-beige w-full h-9"
                />
              </div>
              <div className="basis-1/2">
                <div className="flex flex-row gap-4">
                  <div className="basis-1/6">
                    <input
                      {...register("personalCode")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                  <div className="basis-1/6">
                    <input
                      {...register("personalCode")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                  <div className="basis-2/6">
                    <input
                      {...register("personalCode")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                  <div className="basis-2/6">
                    <input
                      {...register("personalCode")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                </div>
              </div>
            </div>
            */}

            <div className="flex justify-between mt-40">
              <button className="bg-green py-5 px-8 font-semibold h-[66px]">
                <Trans>Salvesta PDF</Trans>
              </button>
              <div className="text-right">
                <h6 className="font-semibold mb-1">
                  <Trans>Tasumisele kuuluv NETO töötasu</Trans>
                </h6>
                <h3 className="font-semibold">1 000.00 EUR</h3>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payslip;
