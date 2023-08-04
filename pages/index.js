import React, { useMemo, useState } from "react";
import Head from "next/head";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useForm } from "react-hook-form";
import { parse } from "mathjs/number";
import max from "lodash/max";
import min from "lodash/min";
import round from "lodash/round";

import Payslip from "components/payslip";
import TaxInfo from "components/tax-info";
import formatCurrency from "utils/currency";
import { loadCatalog } from "utils/lingui";

const DEFAULT_GROSS_AMOUNT = 1000;

const bisectionMethodAdvanced = (func, rightSide, lowerBound, upperBound) => {
  const tolerance = 0.0001;
  let a = lowerBound;
  let b = upperBound;

  const leftSide = func;

  if ((leftSide(a) - rightSide) * (leftSide(b) - rightSide) > 0) {
    return undefined;
  }

  while ((b - a) / 2 > tolerance) {
    const c = (a + b) / 2;
    const result = leftSide(c);
    if (result < rightSide) {
      a = c;
    } else {
      b = c;
    }
  }

  const x = (a + b) / 2;
  return x;
};

const Index = () => {
  useLingui();

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: DEFAULT_GROSS_AMOUNT,
      amountType: "gross",
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employeeUnemploymentInsurance: true,
      employerUnemploymentInsurance: true,
      fundedPension: true,
    },
  });

  const values = watch();

  const grossSalary = useMemo(() => {
    let grossSalaryValue = null;

    if (values.amount > 0) {
      // Salary fund
      if (values.amountType === "total") {
        // Social tax minimum ensurement
        if (values.socialTaxMinimum && values.amount <= 654) {
          const func = (x) => {
            const minimum = 215.82; // 654 * 0.33
            const eq = parse(`${minimum} + (x * 0.008) + x`);
            const code = eq.compile();
            const result = code.evaluate({ x });
            return result;
          };
          grossSalaryValue = bisectionMethodAdvanced(
            func,
            values.amount,
            0,
            values.amount
          );
        } else {
          if (values.employerUnemploymentInsurance) {
            grossSalaryValue = values.amount / 1.338;
          } else {
            grossSalaryValue = values.amount / 1.33;
          }
        }
      } else if (values.amountType === "gross") {
        // Gross
        grossSalaryValue = values.amount;
      } else if (values.amountType === "net") {
        // Net
        const fp = values.fundedPension ? `x * 0.02` : 0; // Funded pension
        const eu = values.employeeUnemploymentInsurance ? `x * 0.016` : 0; // Employee unemployment insurance

        // Function to solve
        const func = (x) => {
          let tf = 0; // Tax free income

          if (x <= 1200) {
            tf = min([values.amount, 654]);
          } else if (x > 1200 && x < 2100) {
            tf = `(7848 - (7848 / 10800) * (x * 12 - 14400)) / 12`;
          }

          const eq = parse(
            `x - ${fp} - ${eu} - ((x - ${tf} - ${fp} - ${eu}) * 0.2)`
          );
          const code = eq.compile();
          const result = code.evaluate({ x });
          return result;
        };

        // solve the equation
        grossSalaryValue = bisectionMethodAdvanced(
          func,
          values.amount,
          values.amount,
          values.amount * 2
        );
      }

      // Always return a value rounded to two decimal places
      return grossSalaryValue ? round(grossSalaryValue, 2) : null;
    }
    return 0;
  }, [
    values.amountType,
    values.amount,
    values.socialTaxMinimum,
    values.employerUnemploymentInsurance,
    values.employeeUnemploymentInsurance,
    values.fundedPension,
  ]);

  // Employer unemployment insurance
  const employerUnemploymentInsuranceTax = useMemo(() => {
    if (!(grossSalary > 0) || !values.employerUnemploymentInsurance) return 0;
    return round(grossSalary * 0.008, 2);
  }, [values.employerUnemploymentInsurance, grossSalary]);

  // Employee unemployment insurance
  const employeeUnemploymentInsuranceTax = useMemo(() => {
    if (!(grossSalary > 0) || !values.employeeUnemploymentInsurance) return 0;
    return round(grossSalary * 0.016, 2);
  }, [values.employeeUnemploymentInsurance, grossSalary]);

  // Funded pension
  const fundedPension = useMemo(() => {
    if (!(grossSalary > 0) || !values.fundedPension) return 0;
    return round(grossSalary * 0.02, 2);
  }, [values.fundedPension, grossSalary]);

  // Tax free income
  const taxFreeIncome = useMemo(() => {
    if (!values.taxFreeIncome || !(grossSalary > 0)) return 0;

    const amount = values.taxFreeIncomeAmount;

    if (grossSalary <= 1200) {
      return min([654, values.amount, amount]);
    } else if (grossSalary > 1200 && grossSalary < 2100) {
      return round(
        (7848 - (7848 / 10800) * (grossSalary * 12 - 14400)) / 12,
        2
      );
    } else if (grossSalary >= 2100) {
      return 0;
    }
  }, [grossSalary, values.taxFreeIncome, values.taxFreeIncomeAmount]);

  // Income tax
  const incomeTax = useMemo(() => {
    if (!(grossSalary > 0) || grossSalary < taxFreeIncome) return 0;

    return max([
      round(
        (grossSalary -
          taxFreeIncome -
          fundedPension -
          employeeUnemploymentInsuranceTax) *
          0.2,
        2
      ),
      0,
    ]);
  }, [
    grossSalary,
    taxFreeIncome,
    fundedPension,
    values.employeeUnemploymentInsurance,
    values.fundedPension,
  ]);

  const socialTax = useMemo(() => {
    if (!(grossSalary > 0)) return 0;
    if (values.socialTaxMinimum && grossSalary <= 654) return 215.82;
    return round(grossSalary * 0.33, 2);
  }, [grossSalary, values.socialTaxMinimum]);

  const salaryFund = useMemo(() => {
    if (!(grossSalary > 0)) return 0;
    return round(grossSalary + socialTax + employerUnemploymentInsuranceTax, 2);
  }, [
    grossSalary,
    socialTax,
    employerUnemploymentInsuranceTax,
    values.employerUnemploymentInsurance,
  ]);

  const netSalary = useMemo(() => {
    if (!(grossSalary > 0)) return 0;
    return round(
      grossSalary -
        incomeTax -
        employeeUnemploymentInsuranceTax -
        fundedPension,
      2
    );
  }, [grossSalary, incomeTax, employeeUnemploymentInsuranceTax, fundedPension]);

  const amountTypes = [
    { id: "total", title: <Trans>Tööandja kulu</Trans> },
    { id: "gross", title: <Trans>Brutopalk</Trans> },
    { id: "net", title: <Trans>Netopalk</Trans> },
  ];

  const [showPayslip, setShowPayslip] = useState(false);

  return (
    <>
      <Head>
        <title>Palgakalkulaator</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={t`Palgakalkulaator aitab arvestada netopalga, brutopalga, tööandja kulu, maksud ja luua töötajale palgalehe.`}
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mt-12 mb-14 space-y-12 md:flex-row lg:mt-24 lg:mb-28 md:space-x-4 md:space-y-0">
          <div className="basis-2/5">
            <form>
              <div className="flex items-center relative w-full lg:max-w-[350px] h-[88px] bg-white rounded-[50px] shadow-sm pl-12 pr-20">
                <input
                  {...register("amount", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="1000.00"
                  step="0.01"
                  className="border-transparent appearance-none h-[88px] w-full text-[56px] font-general text-right px-0"
                />
                <div className="pointer-events-none absolute inset-y-0 right-8 flex items-center text-[56px] font-general">
                  €
                </div>
              </div>

              <fieldset className="mt-7">
                <legend className="sr-only">
                  <Trans>Summa tüüp</Trans>
                </legend>
                <div className="flex flex-row items-center space-x-2 md:space-x-4 lg:space-x-8">
                  {amountTypes.map((amountType) => (
                    <div key={amountType.id}>
                      <div className="flex items-center">
                        <input
                          value={amountType.id}
                          type="radio"
                          {...register("amountType")}
                          className="h-4 w-4 border-gray-300 text-dark-blue focus:ring-transparent"
                        />
                        <label
                          htmlFor={amountType.id}
                          className="ml-2 block text-sm font-semibold"
                        >
                          {amountType.title}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-8 md:mt-[72px] space-y-3">
                <legend>
                  <h6>
                    <Trans>Mahaarvamised:</Trans>
                  </h6>
                </legend>
                <div className="flex items-center">
                  <input
                    {...register("socialTaxMinimum")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="socialTaxMinimum"
                    className="text-sm font-semibold ml-2"
                  >
                    <Trans>Sotsiaalmaksu min. kuumäär</Trans>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register("taxFreeIncome")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="taxFreeIncome"
                    className="text-sm font-semibold ml-2"
                  >
                    <Trans>Maksuvaba tulu</Trans>{" "}
                    {values.taxFreeIncome ? (
                      <>
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          className="font-general text-lg leading-[1.3] px-2 py-1 border-b border-dark-blue focus:outline-none"
                          {...register("taxFreeIncomeAmount", {
                            required:
                              "Maksuvaba tulu väärtus peab olema määratud",
                          })}
                          onInput={(e) => {
                            if (e.currentTarget.textContent) {
                              setValue(
                                "taxFreeIncomeAmount",
                                e.currentTarget.textContent,
                                {
                                  shouldDirty: true,
                                }
                              );
                            }
                          }}
                        >
                          654
                        </span>
                        <span className="font-general text-lg leading-[1.3] pl-1 pr-2 py-1 border-b border-dark-blue">
                          €
                        </span>
                      </>
                    ) : (
                      <span className="font-general text-lg leading-[1.3] pl-1 pr-2 py-1 border-b border-dark-blue">
                        0 €
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register("employerUnemploymentInsurance")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="employerUnemploymentInsurance"
                    className="text-sm font-semibold ml-2"
                  >
                    <Trans>Tööandja töötuskindlustusmakse (0.8%)</Trans>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register("employeeUnemploymentInsurance")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="employeeUnemploymentInsurance"
                    className="text-sm font-semibold ml-2"
                  >
                    <Trans>Töötaja töötuskindlustusmakse (1.6%)</Trans>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register("fundedPension")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="fundedPension"
                    className="text-sm font-semibold ml-2"
                  >
                    <Trans>Kogumispensioniga liitunud (2%)</Trans>
                  </label>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="basis-3/5">
            <div className="pt-4 pb-3 px-4 md:pt-8 md:pb-6 md:px-8 lg:pt-16 lg:pb-12 lg:px-16 bg-white">
              <table className="w-full border-separate border-spacing-y-3 mb-10">
                <tbody>
                  <tr>
                    <td>
                      <h4>
                        <Trans>Tööandja kulu</Trans>
                      </h4>
                    </td>
                    <td className="font-general text-xl lg:text-2xl text-right whitespace-nowrap">
                      {formatCurrency(salaryFund)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Trans>Sotsiaalmaks</Trans>
                    </td>
                    <td className="text-right whitespace-nowrap">
                      {formatCurrency(socialTax)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Trans>Tööandja töötuskindlustusmakse</Trans>
                    </td>
                    <td className="text-right whitespace-nowrap">
                      {formatCurrency(employerUnemploymentInsuranceTax)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full border-separate border-spacing-y-3 mb-10">
                <tbody>
                  <tr>
                    <td>
                      <h4>
                        <Trans>Brutopalk</Trans>
                      </h4>
                    </td>
                    <td className="font-general text-xl lg:text-2xl text-right whitespace-nowrap">
                      {grossSalary ? formatCurrency(grossSalary) : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Trans>Kogumispension</Trans>
                    </td>
                    <td className="text-right">
                      {formatCurrency(fundedPension)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Trans>Töötaja töötuskindlustusmakse</Trans>
                    </td>
                    <td className="text-right whitespace-nowrap">
                      {formatCurrency(employeeUnemploymentInsuranceTax)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Trans>Tulumaks</Trans>
                    </td>
                    <td className="text-right whitespace-nowrap">
                      {formatCurrency(incomeTax)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full border-separate border-spacing-y-3">
                <tbody>
                  <tr>
                    <td>
                      <h4>
                        <Trans>Netopalk</Trans>
                      </h4>
                    </td>
                    <td className="font-general text-xl lg:text-2xl text-right whitespace-nowrap">
                      {formatCurrency(netSalary)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="flex justify-center items-center w-full h-[66px] bg-green font-semibold"
              onClick={() => {
                setShowPayslip(true);
                document.getElementById("payslip").scrollIntoView();
              }}
            >
              <Trans>Koosta palgateatis</Trans>
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

      <div id="payslip" className="bg-rainbow">
        <div className={`${showPayslip ? "" : "hidden"}`}>
          <Payslip
            grossSalary={grossSalary}
            netSalary={netSalary}
            salaryFund={salaryFund}
            fundedPension={fundedPension}
            incomeTax={incomeTax}
            socialTax={socialTax}
            employeeUnemploymentInsuranceTax={employeeUnemploymentInsuranceTax}
            employerUnemploymentInsuranceTax={employerUnemploymentInsuranceTax}
          />
        </div>
      </div>

      <TaxInfo />
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

export default Index;
