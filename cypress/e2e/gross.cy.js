import formatCurrency from "/utils/currency";

const grossScenarios = [
  {
    total: 669,
    socialTax: 165,
    employerUnemploymentInsurance: 4,
    gross: 500,
    fundedPension: 10,
    employeeUnemploymentInsurance: 8,
    incomeTax: 0,
    net: 482,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: true,
      fundedPension: true,
    },
  },
  {
    total: 875.05,
    socialTax: 215.82,
    employerUnemploymentInsurance: 5.23,
    gross: 654,
    fundedPension: 13.08,
    employeeUnemploymentInsurance: 10.46,
    incomeTax: 0,
    net: 630.46,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: true,
      fundedPension: true,
    },
  },
  {
    total: 1338,
    socialTax: 330,
    employerUnemploymentInsurance: 8,
    gross: 1000,
    fundedPension: 20,
    employeeUnemploymentInsurance: 16,
    incomeTax: 62,
    net: 902,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: true,
      fundedPension: true,
    },
  },
  {
    total: 1605.6,
    socialTax: 396.0,
    employerUnemploymentInsurance: 9.6,
    gross: 1200,
    fundedPension: 24.0,
    employeeUnemploymentInsurance: 19.2,
    incomeTax: 100.56,
    net: 1056.24,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: true,
      fundedPension: true,
    },
  },
  {
    total: 2007.0,
    socialTax: 495.0,
    employerUnemploymentInsurance: 12.0,
    gross: 1500,
    fundedPension: 30.0,
    employeeUnemploymentInsurance: 24.0,
    incomeTax: 202.0,
    net: 1244.0,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: true,
      fundedPension: true,
    },
  },
  {
    total: 2809.8,
    socialTax: 693.0,
    employerUnemploymentInsurance: 16.8,
    gross: 2100.0,
    fundedPension: 42.0,
    employeeUnemploymentInsurance: 33.6,
    incomeTax: 404.88,
    net: 1619.52,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: true,
      fundedPension: true,
    },
  },
  {
    total: 4014.0,
    socialTax: 990.0,
    employerUnemploymentInsurance: 24.0,
    gross: 3000,
    fundedPension: 60.0,
    employeeUnemploymentInsurance: 48.0,
    incomeTax: 578.4,
    net: 2313.6,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: true,
      fundedPension: true,
    },
  },
  {
    total: 4014.0,
    socialTax: 990.0,
    employerUnemploymentInsurance: 24.0,
    gross: 3000,
    fundedPension: 60.0,
    employeeUnemploymentInsurance: 48.0,
    incomeTax: 578.4,
    net: 2313.6,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: true,
      fundedPension: true,
    },
  },

  // Employee unemployment insurance not paid
  {
    total: 1338,
    socialTax: 330,
    employerUnemploymentInsurance: 8,
    gross: 1000,
    fundedPension: 20,
    employeeUnemploymentInsurance: 0,
    incomeTax: 65.2,
    net: 914.8,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: false,
      fundedPension: true,
    },
  },
  // Employer unemployment insurance not paid
  {
    total: 1330,
    socialTax: 330,
    employerUnemploymentInsurance: 0,
    gross: 1000,
    fundedPension: 20,
    employeeUnemploymentInsurance: 16,
    incomeTax: 62,
    net: 902,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: false,
      employeeUnemploymentInsurance: true,
      fundedPension: true,
    },
  },
  // Employer & Employee unemployment insurance not paid
  {
    total: 1330,
    socialTax: 330,
    employerUnemploymentInsurance: 0,
    gross: 1000,
    fundedPension: 20,
    employeeUnemploymentInsurance: 0,
    incomeTax: 65.2,
    net: 914.8,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: false,
      employeeUnemploymentInsurance: false,
      fundedPension: true,
    },
  },
  // Employer & Employee unemployment insurance not paid & funded pension not paid
  {
    total: 1330,
    socialTax: 330,
    employerUnemploymentInsurance: 0,
    gross: 1000,
    fundedPension: 0,
    employeeUnemploymentInsurance: 0,
    incomeTax: 69.2,
    net: 930.8,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: false,
      employeeUnemploymentInsurance: false,
      fundedPension: false,
    },
  },
  // Employer & Employee unemployment insurance not paid, funded pension not paid &
  // no income tax free minimum
  {
    total: 1330,
    socialTax: 330,
    employerUnemploymentInsurance: 0,
    gross: 1000,
    fundedPension: 0,
    employeeUnemploymentInsurance: 0,
    incomeTax: 200,
    net: 800,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: false,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: false,
      employeeUnemploymentInsurance: false,
      fundedPension: false,
    },
  },
];

describe("Salary calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Replace with the actual URL of your application
  });

  // for each grossScenarios
  grossScenarios.forEach((scenario) => {
    it(`should calculate and display the correct salary for gross amount ${scenario["gross"]}`, () => {
      const amount = scenario["gross"];

      cy.get('input[name="amount"]').clear().type(amount);

      // Select the "Gross" option
      cy.get('input[name="amountType"][value="gross"]').check();

      // Social tax minimum
      if (scenario["deductions"]["socialTaxMinimum"]) {
        cy.get('input[name="socialTaxMinimum"]').check();
      } else {
        cy.get('input[name="socialTaxMinimum"]').uncheck();
      }

      // Tax free income
      cy.get('span[name="taxFreeIncomeAmount"]')
        .clear()
        .type(scenario["deductions"]["taxFreeIncomeAmount"]);
      if (scenario["deductions"]["taxFreeIncome"]) {
        cy.get('input[name="taxFreeIncome"]').check();
      } else {
        cy.get('input[name="taxFreeIncome"]').uncheck();
      }

      // Employer unemployment insurance
      if (scenario["deductions"]["employerUnemploymentInsurance"]) {
        cy.get('input[name="employerUnemploymentInsurance"]').check();
      } else {
        cy.get('input[name="employerUnemploymentInsurance"]').uncheck();
      }

      // Employee unemployment insurance
      if (scenario["deductions"]["employeeUnemploymentInsurance"]) {
        cy.get('input[name="employeeUnemploymentInsurance"]').check();
      } else {
        cy.get('input[name="employeeUnemploymentInsurance"]').uncheck();
      }

      // Funded pension
      if (scenario["deductions"]["fundedPension"]) {
        cy.get('input[name="fundedPension"]').check();
      } else {
        cy.get('input[name="fundedPension"]').uncheck();
      }

      // Tööandja kulu
      cy.contains("h4", "Tööandja kulu")
        .parent()
        .next("td")
        .should("contain", `${formatCurrency(scenario["total"], "€")}`);

      cy.contains("td", "Sotsiaalmaks")
        .next("td")
        .should("contain", `${formatCurrency(scenario["socialTax"], "€")}`);

      cy.contains("td", "Tööandja töötuskindlustusmakse")
        .next("td")
        .should(
          "contain",
          `${formatCurrency(scenario["employerUnemploymentInsurance"], "€")}`
        );

      // Bruto
      cy.contains("h4", "Brutopalk")
        .parent()
        .next("td")
        .should("contain", `${formatCurrency(scenario["gross"], "€")}`);

      cy.contains("td", "Kogumispension")
        .next("td")
        .should("contain", `${formatCurrency(scenario["fundedPension"], "€")}`);

      cy.contains("td", "Töötaja töötuskindlustusmakse")
        .next("td")
        .should(
          "contain",
          `${formatCurrency(scenario["employeeUnemploymentInsurance"], "€")}`
        );

      cy.contains("td", "Tulumaks")
        .next("td")
        .should("contain", `${formatCurrency(scenario["incomeTax"], "€")}`);

      // Neto
      cy.contains("h4", "Netopalk")
        .parent()
        .next("td")
        .should("contain", `${formatCurrency(scenario["net"], "€")}`);
    });
  });
});
