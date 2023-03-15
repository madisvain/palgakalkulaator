import React, { useMemo, useState } from "react";
import { Trans } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import { format, min, parse, simplify } from "mathjs";

import Payslip from "../components/payslip";
import TaxInfo from "../components/tax-info";

const DEFAULT_GROSS_AMOUNT = 1000;

const bisectionMethod = (leftSideStr, rightSide, lowerBound, upperBound) => {
  const tolerance = 0.0001; // Set the tolerance level
  let a = lowerBound; // Set the lower bound
  let b = upperBound; // Set the upper bound

  // Create a new Function object that takes x as an argument and evaluates the left side of the equation
  const leftSide = new Function("x", `return ${leftSideStr};`);

  while ((b - a) / 2 > tolerance) {
    const c = (a + b) / 2; // Calculate the midpoint
    const result = leftSide(c); // Calculate the result of the left side of the equation
    if (result < rightSide) {
      a = c; // Update the lower bound
    } else {
      b = c; // Update the upper bound
    }
  }

  const x = (a + b) / 2; // Calculate the final value of x
  return x;
};

const formatCurreny = (amount, symbol) =>
  `${format(amount, { notation: "fixed", precision: 2 })} ${symbol}`;

const Home = () => {
  const [grossSalary, setGrossSalary] = useState(DEFAULT_GROSS_AMOUNT);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: DEFAULT_GROSS_AMOUNT,
      amountType: "gross",
      taxFreeIncome: true,
      employeeUnemploymentInsurance: true,
      employerUnemploymentInsurance: true,
      fundedPension: true,
    },
  });
  const onSubmit = (data) => console.log(data);

  watch((values) => {
    if (!(values.amount > 0)) {
      setGrossSalary(0);
    } else {
      if (values.amountType === "total") {
        // Slary fund
        if (values.employeeUnemploymentInsurance) {
          setGrossSalary(values.amount / 1.338);
        } else {
          setGrossSalary(values.amount / 1.33);
        }
      } else if (values.amountType === "gross") {
        // Gross
        setGrossSalary(values.amount);
      } else if (values.amountType === "net") {
        // Net
        const fp = values.fundedPension ? `x * 0.02` : 0; // Funded pension
        const eu = values.employeeUnemploymentInsurance ? `x * 0.016` : 0; // Employee unemployment insurance

        const f = parse(
          `x - ${fp} - ${eu} - ((x - 654 - ${fp} - ${eu}) * 0.2)`
        );
        const simplified = simplify(f);
        console.log(simplified.toString());

        // solve the equation
        const solution = bisectionMethod(
          simplified.toString(),
          values.amount,
          values.amount,
          values.amount * 2
        );

        setGrossSalary(solution);
      }
    }
  });

  const taxFreeIncome = () => {
    if (!(grossSalary > 0)) return 0;
    // TODO: implement input values
    if (grossSalary < 1200) {
      return 654;
    } else if (grossSalary > 1200 && grossSalary < 2100) {
      return (7848 - (7848 / 10800) * (grossSalary * 12 - 14400)) / 12;
    } else if (grossSalary > 2100) {
      return 0;
    }
  };
  const incomeTax = () => {
    if (!(grossSalary > 0) || grossSalary < taxFreeIncome()) return 0;
    return (
      (grossSalary -
        taxFreeIncome() -
        fundedPension() -
        employeeUnemploymentInsuranceTax()) *
      0.2
    );
  };
  const socialTax = () => {
    if (!(grossSalary > 0)) return 0;
    return grossSalary * 0.33;
  };

  // Employer unemployment insurance
  console.log(getValues("employerUnemploymentInsurance"));
  const employerUnemploymentInsuranceTax = useMemo(() => {
    console.log("employerUnemploymentInsurance", "= = =");
    if (!(grossSalary > 0) || !getValues("employerUnemploymentInsurance"))
      return 0;
    return grossSalary * 0.008;
  }, [getValues("employerUnemploymentInsurance")]);

  // Employee unemployment insurance
  const employeeUnemploymentInsuranceTax = () => {
    if (!(grossSalary > 0)) return 0;
    return grossSalary * 0.016;
  };
  const fundedPension = () => {
    if (!(grossSalary > 0)) return 0;
    return grossSalary * 0.02;
  };

  const salaryFund = useMemo(() => {
    if (!(grossSalary > 0)) return 0;
    return grossSalary + socialTax() + employerUnemploymentInsuranceTax;
  }, [grossSalary]);

  const netSalary = useMemo(() => {
    if (!(grossSalary > 0)) return 0;
    return (
      grossSalary -
      incomeTax() -
      employeeUnemploymentInsuranceTax() -
      fundedPension()
    );
  }, [grossSalary]);

  const amountTypes = [
    { id: "total", title: "Tööandja kulu" },
    { id: "gross", title: "Brutopalk" },
    { id: "net", title: "Netopalk" },
  ];

  console.log("render");
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
                    <span className="font-general text-lg leading-[1.3] px-2 py-1 border-b border-dark-blue">
                      654 €
                    </span>
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
                      {formatCurreny(socialTax(), "€")}
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
                      {formatCurreny(fundedPension(), "€")}
                    </td>
                  </tr>
                  <tr>
                    <td>Töötaja töötuskindlustusmakse</td>
                    <td className="text-right">
                      {formatCurreny(employeeUnemploymentInsuranceTax(), "€")}
                    </td>
                  </tr>
                  <tr>
                    <td>Tulumaks</td>
                    <td className="text-right">
                      {formatCurreny(incomeTax(), "€")}
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

      <div className="bg-rainbow">
        <Payslip />
      </div>

      <TaxInfo />
    </>
  );
};

export default Home;
