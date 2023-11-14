import { t, Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { enGB, et } from "date-fns/locale";
import { pdf } from "@react-pdf/renderer";

import DatePicker from "components/datepicker";
import PDF from "components/pdf";
import formatCurrency from "utils/currency";

const downloadBlob = (blob, name = "palgaleht.pdf") => {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  // Remove link from body
  document.body.removeChild(link);
};

const Payslip = ({
  grossSalary,
  netSalary,
  salaryFund,
  fundedPension,
  socialTax,
  incomeTax,
  employeeUnemploymentInsuranceTax,
  employerUnemploymentInsuranceTax,
  taxFreeIncome,
}) => {
  const router = useRouter();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: `${t`Palgaleht`} ${format(subMonths(new Date(), 1), "MMMM yyyy", {
        locale: router.locale === "et" ? et : enGB,
      })}`,
      periodStart: format(startOfMonth(subMonths(new Date(), 1)), "dd.MM.yyyy"),
      periodEnd: format(endOfMonth(subMonths(new Date(), 1)), "dd.MM.yyyy"),
    },
  });

  const onSubmit = (data) => {
    pdf(
      <PDF
        {...data}
        grossSalary={grossSalary}
        netSalary={netSalary}
        salaryFund={salaryFund}
        fundedPension={fundedPension}
        socialTax={socialTax}
        incomeTax={incomeTax}
        employeeUnemploymentInsuranceTax={employeeUnemploymentInsuranceTax}
        employerUnemploymentInsuranceTax={employerUnemploymentInsuranceTax}
        taxFreeIncome={taxFreeIncome}
      />
    )
      .toBlob()
      .then((blob) => {
        downloadBlob(blob);
      });
  };

  return (
    <div className="mx-auto max-w-7xl md:px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row pt-12 pb-14 px-2 xl:pt-24 xl:pb-28 xl:px-16">
          <div className="bg-white w-full py-4 px-4 md:py-8 md:px-8 xl:py-28 xl:px-20">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="basis-1/2">
                <div className="flex flex-row gap-4 items-center mb-14">
                  <div className="basis-full">
                    <input
                      {...register("title")}
                      type="text"
                      className="border-transparent bg-beige w-full h-12 font-semibold text-3xl"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center mb-3">
                  <div className="basis-1/3 lg:text-right text-dark-blue opacity-40 font-general font-semibold">
                    <Trans>Tööandja</Trans>
                  </div>
                  <div className="basis-2/3">
                    <input
                      {...register("employer")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center mb-3">
                  <div className="basis-1/3 lg:text-right text-dark-blue opacity-40 font-general font-semibold">
                    <Trans>Töötaja</Trans>
                  </div>
                  <div className="basis-2/3">
                    <input
                      {...register("employee")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center mb-3">
                  <div className="basis-1/3 lg:text-right text-dark-blue opacity-40 font-general font-semibold">
                    <Trans>Isikukood</Trans>
                  </div>
                  <div className="basis-2/3">
                    <input
                      {...register("personalCode")}
                      type="text"
                      className="border-transparent bg-beige w-full h-9"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center mb-3">
                  <div className="basis-1/3 lg:text-right text-dark-blue opacity-40 font-general font-semibold">
                    <Trans>Periood</Trans>
                  </div>
                  <div className="basis-2/3">
                    <div className="flex flex-row gap-4">
                      <div className="basis-1/2">
                        <DatePicker
                          name="periodStart"
                          register={register}
                          setValue={setValue}
                          value={watch("periodStart")}
                        />
                      </div>
                      <div className="basis-1/2">
                        <DatePicker
                          name="periodEnd"
                          register={register}
                          setValue={setValue}
                          value={watch("periodEnd")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center">
                  <div className="basis-1/3 lg:text-right text-dark-blue opacity-40 font-general font-semibold">
                    <Trans>Märkus</Trans>
                  </div>
                  <div className="basis-2/3">
                    <textarea
                      {...register("notes")}
                      rows={6}
                      className="border-transparent bg-beige w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="basis-1/2">
                <div className="flex flex-row mb-6">
                  <h4 className="grow">
                    <Trans>Brutopalk</Trans>
                  </h4>
                  <h4 className="whitespace-nowrap">
                    {formatCurrency(grossSalary)}
                  </h4>
                </div>
                <div className="flex flex-row mb-3">
                  <h5 className="grow pl-2">
                    <Trans>Kinnipidamised</Trans>
                  </h5>
                  <h5 className="whitespace-nowrap">
                    {formatCurrency(
                      fundedPension +
                        employeeUnemploymentInsuranceTax +
                        incomeTax
                    )}
                  </h5>
                </div>
                <div className="flex flex-row mb-2">
                  <div className="grow leading-relaxed text-base pl-6">
                    <Trans>Kogumispension</Trans>
                  </div>
                  <div className="leading-relaxed text-base whitespace-nowrap">
                    {formatCurrency(fundedPension)}
                  </div>
                </div>
                <div className="flex flex-row mb-2">
                  <div className="grow leading-relaxed text-base pl-6">
                    <Trans>Töötaja töötuskindlustusmakse</Trans>
                  </div>
                  <div className="leading-relaxed text-base whitespace-nowrap">
                    {formatCurrency(employeeUnemploymentInsuranceTax)}
                  </div>
                </div>
                <div className="flex flex-row mb-6">
                  <div className="grow leading-relaxed text-base pl-6">
                    <Trans>Tulumaks</Trans>
                    <br />
                    <span className="text-xs italic">
                      <Trans>Arvestatud tulumaksuvaba miinimum</Trans>
                    </span>
                    <span className="text-xs font-bold ml-1">
                      {formatCurrency(taxFreeIncome)}
                    </span>
                  </div>
                  <div className="leading-relaxed text-base whitespace-nowrap">
                    {formatCurrency(incomeTax)}
                  </div>
                </div>

                <div className="flex flex-row mb-6">
                  <h4 className="grow">
                    <Trans>Netopalk</Trans>
                  </h4>
                  <h4 className="whitespace-nowrap">
                    {formatCurrency(netSalary)}
                  </h4>
                </div>
                <div className="flex flex-row mb-3">
                  <h5 className="grow pl-2">
                    <Trans>Tööandja maksud</Trans>
                  </h5>
                  <h5 className="whitespace-nowrap">
                    {formatCurrency(
                      socialTax + employerUnemploymentInsuranceTax
                    )}
                  </h5>
                </div>
                <div className="flex flex-row mb-2">
                  <div className="grow leading-relaxed text-base pl-6">
                    <Trans>Sotsiaalmaks</Trans>
                  </div>
                  <div className="leading-relaxed text-base whitespace-nowrap">
                    {formatCurrency(socialTax)}
                  </div>
                </div>
                <div className="flex flex-row mb-6">
                  <div className="grow leading-relaxed text-base pl-6">
                    <Trans>Tööandja töötuskindlustusmakse</Trans>
                  </div>
                  <div className="leading-relaxed text-base whitespace-nowrap">
                    {formatCurrency(employerUnemploymentInsuranceTax)}
                  </div>
                </div>
                <div className="flex flex-row">
                  <h4 className="grow">
                    <Trans>Tööandja kulu</Trans>
                  </h4>
                  <h4 className="whitespace-nowrap">
                    {formatCurrency(salaryFund)}
                  </h4>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end mt-10 mb-10 md:mb-0 md:mt-20 lg:mt-40">
              <button
                type="submit"
                className="bg-green py-5 px-8 font-semibold h-[66px] w-full md:w-auto"
              >
                <Trans>Salvesta PDF</Trans>
              </button>
              <div className="hidden w-full mb-4 order-first md:block md:order-last md:w-auto md:text-right">
                <h6 className="font-semibold mb-1">
                  <Trans>Tasumisele kuuluv neto töötasu</Trans>
                </h6>
                <h3 className="font-semibold">{formatCurrency(netSalary)}</h3>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payslip;
