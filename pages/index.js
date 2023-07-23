import React, { useMemo, useState } from "react";
import { Trans } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import { max, min, parse, simplify, round } from "mathjs";

import Payslip from "components/payslip";
import TaxInfo from "components/tax-info";
import formatCurreny from "utils/currency";

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

const Home = () => {
  const {
    register,
    handleSubmit,
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
  const onSubmit = (data) => console.log(data);

  const values = watch();

  const grossSalary = useMemo(() => {
    let grossSalaryValue = null;

    if (values.amount > 0) {
      if (values.amountType === "total") {
        // Salary fund
        if (values.employerUnemploymentInsurance) {
          grossSalaryValue = values.amount / 1.338;
        } else {
          grossSalaryValue = values.amount / 1.33;
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
            tf = Math.min(values.amount, 654);
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
    if (!(grossSalary > 0)) return 0;

    const amount = values.taxFreeIncomeAmount;

    if (grossSalary <= 1200) {
      return min(654, values.amount, amount);
    } else if (grossSalary > 1200 && grossSalary < 2100) {
      return round(
        (7848 - (7848 / 10800) * (grossSalary * 12 - 14400)) / 12,
        2
      );
    } else if (grossSalary >= 2100) {
      return 0;
    }
  }, [grossSalary, values.taxFreeIncomeAmount]);

  // Income tax
  const incomeTax = useMemo(() => {
    if (!(grossSalary > 0) || grossSalary < taxFreeIncome) return 0;
    return max(
      round(
        (grossSalary -
          taxFreeIncome -
          fundedPension -
          employeeUnemploymentInsuranceTax) *
          0.2,
        2
      ),
      0
    );
  }, [grossSalary, taxFreeIncome, fundedPension]);

  const socialTax = useMemo(() => {
    if (!(grossSalary > 0)) return 0;
    return round(grossSalary * 0.33, 2);
  }, [grossSalary]);

  const salaryFund = useMemo(() => {
    if (!(grossSalary > 0)) return 0;
    return round(grossSalary + socialTax + employerUnemploymentInsuranceTax, 2);
  }, [grossSalary, socialTax, employerUnemploymentInsuranceTax]);

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
    { id: "total", title: "Tööandja kulu" },
    { id: "gross", title: "Brutopalk" },
    { id: "net", title: "Netopalk" },
  ];

  const [showPayslip, setShowPayslip] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row mt-24 mb-28">
          <div className="basis-2/5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center relative w-[350px] h-[88px] bg-white rounded-[50px] shadow-sm pl-12 pr-20">
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
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {amountTypes.map((amountType) => (
                    <div key={amountType.id} className="flex items-center">
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
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-[72px] space-y-3">
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
                    Sotsiaalmaksu min. kuumäär
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
                    Maksuvaba tulu{" "}
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
                    Tööandja töötuskindlustusmakse (0.8%)
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
                    Töötaja töötuskindlustusmakse (1.6%)
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
                    Kogumispensioniga liitunud (2%)
                  </label>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="basis-3/5">
            <div className="pt-16 pb-12 px-16 bg-white">
              <table className="w-full border-separate border-spacing-y-3 mb-10">
                <tbody>
                  <tr>
                    <td>
                      <h4>Tööandja kulu</h4>
                    </td>
                    <td className="font-general text-2xl text-right">
                      {formatCurreny(salaryFund, "€")}
                    </td>
                  </tr>
                  <tr>
                    <td>Sotsiaalmaks</td>
                    <td className="text-right">
                      {formatCurreny(socialTax, "€")}
                    </td>
                  </tr>
                  <tr>
                    <td>Tööandja töötuskindlustusmakse</td>
                    <td className="text-right">
                      {formatCurreny(employerUnemploymentInsuranceTax, "€")}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full border-separate border-spacing-y-3 mb-10">
                <tbody>
                  <tr>
                    <td>
                      <h4>Brutopalk</h4>
                    </td>
                    <td className="font-general text-2xl text-right">
                      {formatCurreny(grossSalary, "€")}
                    </td>
                  </tr>
                  <tr>
                    <td>Kogumispension</td>
                    <td className="text-right">
                      {formatCurreny(fundedPension, "€")}
                    </td>
                  </tr>
                  <tr>
                    <td>Töötaja töötuskindlustusmakse</td>
                    <td className="text-right">
                      {formatCurreny(employeeUnemploymentInsuranceTax, "€")}
                    </td>
                  </tr>
                  <tr>
                    <td>Tulumaks</td>
                    <td className="text-right">
                      {formatCurreny(incomeTax, "€")}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full border-separate border-spacing-y-3">
                <tbody>
                  <tr>
                    <td>
                      <h4>Netopalk</h4>
                    </td>
                    <td className="font-general text-2xl text-right">
                      {formatCurreny(netSalary, "€")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {!showPayslip && (
              <button
                type="button"
                className="flex justify-center items-center w-full h-[66px] bg-green font-semibold"
                onClick={() => setShowPayslip(true)}
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
            )}
          </div>
        </div>
      </div>

      {showPayslip && (
        <div className="bg-rainbow">
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
      )}

      <TaxInfo />
    </>
  );
};

export default Home;
