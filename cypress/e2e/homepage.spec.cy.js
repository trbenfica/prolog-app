describe("Página inicial", () => {
  it("deve carregar a lista de pneus", () => {
    cy.visit("/");

    cy.contains("Atualizar lista").should("be.visible");
    cy.get('[data-testid="tire-table"]', { timeout: 7000 }).should("exist");
    cy.contains("Clique no ícone").should("exist");
  });

  it("deve atualizar a lista de pneus ao clicar no botão", () => {
    cy.visit("/");
    cy.contains("Atualizar lista").click();
    cy.get('[data-testid="tire-table"]').should("exist");
  });

  it("deve abrir o componente de filtro", () => {
    cy.visit("/");
    cy.contains("Filtrar").click();
    cy.get('[data-testid="filtro-form"]').should("be.visible");
  });

  it("deve navegar para a página de detalhes ao clicar no ícone", () => {
    cy.visit("/");
    cy.get('[data-testid="tire-table"] [data-testid="tire-detail-icon"]')
      .first()
      .click();
    cy.url().should("include", "/tires/");
    cy.contains("ID").should("be.visible");
  });

  it("deve exibir mensagem de erro se a API falhar", () => {
    cy.intercept("GET", `${Cypress.env("apiUrl")}/*`, {
      statusCode: 500,
      body: { message: "Erro interno" },
    }).as("getTiresWithError");

    cy.visit("/");

    cy.wait("@getTiresWithError");
    cy.wait("@getTiresWithError");
    cy.wait("@getTiresWithError");

    cy.get('[data-testid="error-alert"]', { timeout: 7000 }).should(
      "be.visible"
    );
  });
});
