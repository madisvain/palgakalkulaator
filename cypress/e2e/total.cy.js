import formatCurrency from "/utils/currency";

const totalScenarios = [
  {
    input: 500,
    total: 500,
    socialTax: 123.32,
    employerUnemploymentInsurance: 2.99,
    gross: 373.69,
    fundedPension: 7.47,
    employeeUnemploymentInsurance: 5.98,
    incomeTax: 0,
    net: 360.24,
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
    input: 654,
    total: 654.0,
    socialTax: 161.3,
    employerUnemploymentInsurance: 3.91,
    gross: 488.79,
    fundedPension: 9.78,
    employeeUnemploymentInsurance: 7.82,
    incomeTax: 0,
    net: 471.19,
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
    input: 1000.0,
    total: 1000.0,
    socialTax: 246.64,
    employerUnemploymentInsurance: 5.98,
    gross: 747.38,
    fundedPension: 14.95,
    employeeUnemploymentInsurance: 11.96,
    incomeTax: 13.29,
    net: 707.18,
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
    input: 1200.0,
    total: 1199.99,
    socialTax: 295.96,
    employerUnemploymentInsurance: 7.17,
    gross: 896.86,
    fundedPension: 17.94,
    employeeUnemploymentInsurance: 14.35,
    incomeTax: 42.11,
    net: 822.46,
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
    input: 1500.0,
    total: 1500.01,
    socialTax: 369.96,
    employerUnemploymentInsurance: 8.97,
    gross: 1121.08,
    fundedPension: 22.42,
    employeeUnemploymentInsurance: 17.94,
    incomeTax: 85.34,
    net: 995.38,
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
    input: 2100.0,
    total: 2100.01,
    socialTax: 517.94,
    employerUnemploymentInsurance: 12.56,
    gross: 1569.51,
    fundedPension: 31.39,
    employeeUnemploymentInsurance: 25.11,
    incomeTax: 225.5,
    net: 1287.51,
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
    input: 3000.0,
    total: 3000.0,
    socialTax: 739.91,
    employerUnemploymentInsurance: 17.94,
    gross: 2242.15,
    fundedPension: 44.84,
    employeeUnemploymentInsurance: 35.87,
    incomeTax: 432.29,
    net: 1729.15,
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
    input: 4000.0,
    total: 4000.01,
    socialTax: 986.55,
    employerUnemploymentInsurance: 23.92,
    gross: 2989.54,
    fundedPension: 59.79,
    employeeUnemploymentInsurance: 47.83,
    incomeTax: 576.38,
    net: 2305.54,
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
    input: 2100.0,
    total: 2100.01,
    socialTax: 517.94,
    employerUnemploymentInsurance: 12.56,
    gross: 1569.51,
    fundedPension: 31.39,
    employeeUnemploymentInsurance: 0,
    incomeTax: 230.53,
    net: 1307.59,
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
    input: 2100.0,
    total: 2100.0,
    socialTax: 521.05,
    employerUnemploymentInsurance: 0,
    gross: 1578.95,
    fundedPension: 31.58,
    employeeUnemploymentInsurance: 25.26,
    incomeTax: 228.7,
    net: 1293.41,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: false,
      employeeUnemploymentInsurance: true,
      fundedPension: true,
    },
  },
  // Employee unemployment insurance not paid & no funded pension
  {
    input: 2100.0,
    total: 2100.01,
    socialTax: 517.94,
    employerUnemploymentInsurance: 12.56,
    gross: 1569.51,
    fundedPension: 0,
    employeeUnemploymentInsurance: 0,
    incomeTax: 236.8,
    net: 1332.71,
    deductions: {
      socialTaxMinimum: false,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 654,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: false,
      fundedPension: false,
    },
  },
  // Tax free income issue
  {
    input: 500,
    total: 500,
    socialTax: 239.25,
    employerUnemploymentInsurance: 2.07,
    gross: 258.68,
    fundedPension: 0,
    employeeUnemploymentInsurance: 4.14,
    incomeTax: 30.91,
    net: 223.63,
    deductions: {
      socialTaxMinimum: true,
      taxFreeIncome: true,
      taxFreeIncomeAmount: 100,
      employerUnemploymentInsurance: true,
      employeeUnemploymentInsurance: true,
      fundedPension: false,
    },
  },
];

describe("Salary calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Replace with the actual URL of your application
  });

  // for each grossScenarios
  totalScenarios.forEach((scenario) => {
    it(`should calculate and display the correct salary for gross amount ${scenario["gross"]}`, () => {
      const amount = scenario["input"];

      cy.get('input[name="amount"]').clear().type(amount);

      // Select the "Netopalk" option
      cy.get('input[name="amountType"][value="total"]').check();

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
        .should("contain", `${formatCurrency(scenario["total"])}`);

      cy.contains("td", "Sotsiaalmaks")
        .next("td")
        .should("contain", `${formatCurrency(scenario["socialTax"])}`);

      cy.contains("td", "Tööandja töötuskindlustusmakse")
        .next("td")
        .should(
          "contain",
          `${formatCurrency(scenario["employerUnemploymentInsurance"])}`
        );

      // Bruto
      cy.contains("h4", "Brutopalk")
        .parent()
        .next("td")
        .should("contain", `${formatCurrency(scenario["gross"])}`);

      cy.contains("td", "Kogumispension")
        .next("td")
        .should("contain", `${formatCurrency(scenario["fundedPension"])}`);

      cy.contains("td", "Töötaja töötuskindlustusmakse")
        .next("td")
        .should(
          "contain",
          `${formatCurrency(scenario["employeeUnemploymentInsurance"])}`
        );

      cy.contains("td", "Tulumaks")
        .next("td")
        .should("contain", `${formatCurrency(scenario["incomeTax"])}`);

      // Neto
      cy.contains("h4", "Netopalk")
        .parent()
        .next("td")
        .should("contain", `${formatCurrency(scenario["net"])}`);
    });
  });
});
