describe("Página de detalhes do pneu", () => {
  it("deve carregar e exibir os dados do pneu", () => {
    cy.intercept("GET", "/api/tires/1", { fixture: "tire.json" }).as("getTire");

    cy.visit("/tires/1");

    cy.wait("@getTire");

    cy.get('[data-testid="tire-details-table"]').should("exist");
    cy.contains("ID").should("exist");
    cy.contains("Serial Number").should("exist");
    cy.contains("Marca").should("exist");

    cy.contains("MICHELIN").should("exist");
  });

  it("deve exibir carregando enquanto espera a resposta", () => {
    cy.intercept("GET", "/api/tires/1", (req) => {
      req.on("response", (res) => {
        res.setDelay(1000);
      });
      req.reply({ fixture: "tire.json" });
    }).as("getTireSlow");

    cy.visit("/tires/1");

    cy.contains("loading").should("exist");
    cy.wait("@getTireSlow");
  });

  it("deve exibir erro se a requisição falhar", () => {
    cy.intercept("GET", "/api/tires/1", {
      statusCode: 500,
      body: { message: "Erro interno" },
    }).as("getTireError");

    cy.visit("/tires/1");

    cy.wait("@getTireError");

    cy.contains("Erro").should("exist");
  });

  it("deve exibir erro se o parâmetro de ID for inválido", () => {
    cy.visit("/tires/invalid-id");
    cy.contains("error: tireId is invalid").should("exist");
  });
});
