import formatCurreny from "/utils/currency";

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

      // Enable checkboxes for desired deductions
      // cy.get('input[name="fundedPension"]').check();
      // cy.get('input[name="employeeUnemploymentInsurance"]').check();

      // Tööandja kulu
      cy.contains("h4", "Tööandja kulu")
        .parent()
        .next("td")
        .should("contain", `${formatCurreny(scenario["total"], "€")}`);

      cy.contains("td", "Sotsiaalmaks")
        .next("td")
        .should("contain", `${formatCurreny(scenario["socialTax"], "€")}`);

      cy.contains("td", "Tööandja töötuskindlustusmakse")
        .next("td")
        .should(
          "contain",
          `${formatCurreny(scenario["employerUnemploymentInsurance"], "€")}`
        );

      // Bruto
      cy.contains("h4", "Brutopalk")
        .parent()
        .next("td")
        .should("contain", `${formatCurreny(scenario["gross"], "€")}`);

      cy.contains("td", "Kogumispension")
        .next("td")
        .should("contain", `${formatCurreny(scenario["fundedPension"], "€")}`);

      cy.contains("td", "Töötaja töötuskindlustusmakse")
        .next("td")
        .should(
          "contain",
          `${formatCurreny(scenario["employeeUnemploymentInsurance"], "€")}`
        );

      cy.contains("td", "Tulumaks")
        .next("td")
        .should("contain", `${formatCurreny(scenario["incomeTax"], "€")}`);

      // Neto
      cy.contains("h4", "Netopalk")
        .parent()
        .next("td")
        .should("contain", `${formatCurreny(scenario["net"], "€")}`);
    });
  });
});
