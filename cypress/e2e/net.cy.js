import formatCurreny from "/utils/currency";

const netScenarios = [
  {
    total: 693.98,
    socialTax: 171.16,
    employerUnemploymentInsurance: 4.15,
    gross: 518.67,
    fundedPension: 10.37,
    employeeUnemploymentInsurance: 8.3,
    incomeTax: 0,
    net: 500,
  },
  {
    total: 907.73,
    socialTax: 223.88,
    employerUnemploymentInsurance: 5.43,
    gross: 678.42,
    fundedPension: 13.57,
    employeeUnemploymentInsurance: 10.85,
    incomeTax: 0,
    net: 654.0,
  },
  {
    total: 1508.02,
    socialTax: 371.93,
    employerUnemploymentInsurance: 9.02,
    gross: 1127.07,
    fundedPension: 22.54,
    employeeUnemploymentInsurance: 18.03,
    incomeTax: 86.5,
    net: 1000,
  },
  {
    total: 1912.94,
    socialTax: 471.8,
    employerUnemploymentInsurance: 11.44,
    gross: 1429.7,
    fundedPension: 28.59,
    employeeUnemploymentInsurance: 22.88,
    incomeTax: 178.23,
    net: 1200.0,
  },
  {
    total: 2554.28,
    socialTax: 629.98,
    employerUnemploymentInsurance: 15.27,
    gross: 1909.03,
    fundedPension: 38.18,
    employeeUnemploymentInsurance: 30.54,
    incomeTax: 340.31,
    net: 1500.0,
  },
  {
    total: 3643.41,
    socialTax: 898.6,
    employerUnemploymentInsurance: 21.78,
    gross: 2723.03,
    fundedPension: 54.46,
    employeeUnemploymentInsurance: 43.57,
    incomeTax: 525.0,
    net: 2100.0,
  },
  {
    total: 5204.87,
    socialTax: 1283.71,
    employerUnemploymentInsurance: 31.12,
    gross: 3890.04,
    fundedPension: 77.8,
    employeeUnemploymentInsurance: 62.24,
    incomeTax: 750.0,
    net: 3000.0,
  },
];

describe("Salary calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Replace with the actual URL of your application
  });

  // for each netScenario
  netScenarios.forEach((scenario) => {
    it(`should calculate and display the correct salary for net amount ${scenario["net"]}`, () => {
      const amount = scenario["net"];

      cy.get('input[name="amount"]').clear().type(amount);

      // Select the "Netopalk" option
      cy.get('input[name="amountType"][value="net"]').check();

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