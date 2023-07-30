describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // The new page should contain an h1 with "Palgakalkulaator" as text
    cy.get("h1").contains("Palgakalkulaator");
  });
});
