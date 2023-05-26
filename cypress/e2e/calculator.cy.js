import formatCurreny from "/utils/currency";

describe("Salary calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Replace with the actual URL of your application
  });

  // 500
  it("should calculate and display the correct salary for 500", () => {
    const amount = 500;

    const salaryComponents = {
      total: 669,
      gross: 500,
      net: 482,
    };

    cy.get('input[name="amount"]').clear().type(amount);

    // Select the "Netopalk" option
    // cy.get('input[name="amountType"][value="net"]').check();

    // Enable checkboxes for desired deductions
    // cy.get('input[name="fundedPension"]').check();
    // cy.get('input[name="employeeUnemploymentInsurance"]').check();

    // Assert that the net salary is displayed correctly
    cy.contains("h4", "Tööandja kulu")
      .parent()
      .next("td")
      .should("contain", `${formatCurreny(salaryComponents["total"], "€")}`);

    cy.contains("h4", "Brutopalk")
      .parent()
      .next("td")
      .should("contain", `${formatCurreny(salaryComponents["gross"], "€")}`);

    // Assert that the net salary is displayed correctly
    cy.contains("h4", "Netopalk")
      .parent()
      .next("td")
      .should("contain", `${formatCurreny(salaryComponents["net"], "€")}`);
  });

  // 654
  it("should calculate and display the correct salary for 654", () => {
    const amount = 654;

    const salaryComponents = {
      total: 875.05,
      gross: 654,
      net: 630.46,
    };

    cy.get('input[name="amount"]').clear().type(amount);

    // Select the "Netopalk" option
    // cy.get('input[name="amountType"][value="net"]').check();

    // Enable checkboxes for desired deductions
    // cy.get('input[name="fundedPension"]').check();
    // cy.get('input[name="employeeUnemploymentInsurance"]').check();

    // Assert that the net salary is displayed correctly
    cy.contains("h4", "Tööandja kulu")
      .parent()
      .next("td")
      .should("contain", `${formatCurreny(salaryComponents["total"], "€")}`);

    cy.contains("h4", "Brutopalk")
      .parent()
      .next("td")
      .should("contain", `${formatCurreny(salaryComponents["gross"], "€")}`);

    // Assert that the net salary is displayed correctly
    cy.contains("h4", "Netopalk")
      .parent()
      .next("td")
      .should("contain", `${formatCurreny(salaryComponents["net"], "€")}`);
  });

  // 1000
  it("should calculate and display the correct salary for 1000", () => {
    const amount = 1000;

    const salaryComponents = {
      total: 1338,
      gross: 1000,
      net: 902,
    };

    cy.get('input[name="amount"]').clear().type(amount);

    // Select the "Netopalk" option
    // cy.get('input[name="amountType"][value="net"]').check();

    // Enable checkboxes for desired deductions
    // cy.get('input[name="fundedPension"]').check();
    // cy.get('input[name="employeeUnemploymentInsurance"]').check();

    // Assert that the net salary is displayed correctly
    cy.contains("h4", "Tööandja kulu")
      .parent()
      .next("td")
      .should("contain", `${formatCurreny(salaryComponents["total"], "€")}`);

    cy.contains("h4", "Brutopalk")
      .parent()
      .next("td")
      .should("contain", `${formatCurreny(salaryComponents["gross"], "€")}`);

    // Assert that the net salary is displayed correctly
    cy.contains("h4", "Netopalk")
      .parent()
      .next("td")
      .should("contain", `${formatCurreny(salaryComponents["net"], "€")}`);
  });
});
