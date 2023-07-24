import { Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";

import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { et } from "date-fns/locale";
import { usePDF } from "@react-pdf/renderer";

import DatePicker from "components/datepicker";
import PDF from "components/pdf";
import formatCurrency from "utils/currency";

const Payslip = ({
  grossSalary,
  netSalary,
  salaryFund,
  fundedPension,
  socialTax,
  incomeTax,
  employeeUnemploymentInsuranceTax,
  employerUnemploymentInsuranceTax,
}) => {
  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: `Palgaleht ${format(subMonths(new Date(), 1), "MMMM yyyy", {
        locale: et,
      })}`,
      periodStart: format(startOfMonth(subMonths(new Date(), 1)), "dd.MM.yyyy"),
      periodEnd: format(endOfMonth(subMonths(new Date(), 1)), "dd.MM.yyyy"),
    },
  });

  const [instance, updateInstance] = usePDF({
    document: (
      <PDF
        title={getValues("title")}
        employer={getValues("employer")}
        employee={getValues("employee")}
        personalCode={getValues("personalCode")}
        periodStart={getValues("periodStart")}
        periodEnd={getValues("periodEnd")}
        notes={getValues("notes")}
        grossSalary={grossSalary}
        netSalary={netSalary}
        salaryFund={salaryFund}
        fundedPension={fundedPension}
        socialTax={socialTax}
        incomeTax={incomeTax}
        employeeUnemploymentInsuranceTax={employeeUnemploymentInsuranceTax}
        employerUnemploymentInsuranceTax={employerUnemploymentInsuranceTax}
      />
    ),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <form>
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
                  <div className="basis-1/3 text-right text-dark-blue opacity-40 font-general font-semibold">
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
                <div className="flex flex-row gap-4 items-center mb-3">
                  <div className="basis-1/3 text-right text-dark-blue opacity-40 font-general font-semibold">
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
                <div className="flex flex-row gap-4 items-center mb-3">
                  <div className="basis-1/3 text-right text-dark-blue opacity-40 font-general font-semibold">
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
                <div className="flex flex-row gap-4 items-center mb-3">
                  <div className="basis-1/3 text-right text-dark-blue opacity-40 font-general font-semibold">
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
                <div className="flex flex-row gap-4 items-center">
                  <div className="basis-1/3 text-right text-dark-blue opacity-40 font-general font-semibold">
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
                    <Trans>Brutotöötasu</Trans>
                  </h4>
                  <h4>{formatCurrency(grossSalary, "€")}</h4>
                </div>
                <div className="flex flex-row mb-3">
                  <h5 className="grow pl-2">
                    <Trans>Kinnipidamised</Trans>
                  </h5>
                  <h5>
                    {formatCurrency(
                      fundedPension +
                        employeeUnemploymentInsuranceTax +
                        incomeTax,
                      "€"
                    )}
                  </h5>
                </div>
                <div className="flex flex-row mb-2">
                  <div className="grow leading-relaxed text-base pl-6">
                    <Trans>Kogumispension</Trans>
                  </div>
                  <div className="leading-relaxed text-base">
                    {formatCurrency(fundedPension, "€")}
                  </div>
                </div>
                <div className="flex flex-row mb-2">
                  <div className="grow leading-relaxed text-base pl-6">
                    <Trans>Töötaja töötuskindlustusmakse</Trans>
                  </div>
                  <div className="leading-relaxed text-base">
                    {formatCurrency(employeeUnemploymentInsuranceTax, "€")}
                  </div>
                </div>
                <div className="flex flex-row mb-6">
                  <div className="grow leading-relaxed text-base pl-6">
                    <Trans>Tulumaks</Trans>
                  </div>
                  <div className="leading-relaxed text-base">
                    {formatCurrency(incomeTax, "€")}
                  </div>
                </div>

                <div className="flex flex-row mb-6">
                  <h4 className="grow">
                    <Trans>Neto töötasu</Trans>
                  </h4>
                  <h4>{formatCurrency(netSalary, "€")}</h4>
                </div>
                <div className="flex flex-row mb-3">
                  <h5 className="grow pl-2">
                    <Trans>Tööandja maksud</Trans>
                  </h5>
                  <h5>
                    {formatCurrency(
                      socialTax + employerUnemploymentInsuranceTax,
                      "€"
                    )}
                  </h5>
                </div>
                <div className="flex flex-row mb-2">
                  <div className="grow leading-relaxed text-base pl-6">
                    <Trans>Sotsiaalmaks</Trans>
                  </div>
                  <div className="leading-relaxed text-base">
                    {formatCurrency(socialTax, "€")}
                  </div>
                </div>
                <div className="flex flex-row mb-6">
                  <div className="grow leading-relaxed text-base pl-6">
                    <Trans>Tööandja töötuskindlustusmakse</Trans>
                  </div>
                  <div className="leading-relaxed text-base">
                    {formatCurrency(employerUnemploymentInsuranceTax, "€")}
                  </div>
                </div>
                <div className="flex flex-row">
                  <h4 className="grow">
                    <Trans>Tööandja kulu</Trans>
                  </h4>
                  <h4>{formatCurrency(salaryFund, "€")}</h4>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end mt-40">
              <a
                href={instance.url}
                download="test.pdf"
                className="bg-green py-5 px-8 font-semibold h-[66px]"
              >
                <Trans>Salvesta PDF</Trans>
              </a>
              <div className="text-right">
                <h6 className="font-semibold mb-1">
                  <Trans>Tasumisele kuuluv neto töötasu</Trans>
                </h6>
                <h3 className="font-semibold">
                  {formatCurrency(netSalary, "€")}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payslip;
