describe("Página de detalhes do pneu", () => {
  it("deve carregar e exibir os dados do pneu", () => {
    cy.intercept("GET", `${Cypress.env("apiUrl")}/tires/*`, {
      fixture: "tire.json",
    }).as("getTire");

    cy.visit("/tires/1");

    cy.wait("@getTire");

    cy.get('[data-testid="tire-details-table"]').should("exist");
    cy.contains("139502").should("exist");
    cy.contains("32141").should("exist");
    cy.contains("Empurrada").should("exist");
  });

  it("deve exibir carregando enquanto espera a resposta", () => {
    cy.intercept("GET", `${Cypress.env("apiUrl")}/tires/*`, (req) => {
      req.on("response", (res) => {
        res.setDelay(1000);
      });
      req.reply({ fixture: "tire.json" });
    }).as("getTireSlow");

    cy.visit("/tires/1");

    cy.get('[data-testid="loading"]').should("be.visible");
    cy.wait("@getTireSlow");
  });

  it("deve exibir erro se a requisição falhar", () => {
    cy.intercept("GET", `${Cypress.env("apiUrl")}/tires/*`, {
      statusCode: 500,
      body: { message: "Erro interno" },
    }).as("getTireError");

    cy.visit("/tires/1");

    cy.wait("@getTireError");
    cy.wait("@getTireError");
    cy.wait("@getTireError");

    cy.get('[data-testid="error-alert"]', { timeout: 7000 }).should(
      "be.visible"
    );
  });

  it("deve exibir erro se o parâmetro de ID for inválido", () => {
    cy.visit("/tires/invalid-id");
    cy.get('[data-testid="error-alert"]').should("be.visible");
  });
});
