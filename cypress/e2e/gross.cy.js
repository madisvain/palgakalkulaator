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

      // Select the "Netopalk" option
      cy.get('input[name="amountType"][value="gross"]').check();

      // Enable checkboxes for desired deductions
      // cy.get('input[name="fundedPension"]').check();
      // cy.get('input[name="employeeUnemploymentInsurance"]').check();

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
