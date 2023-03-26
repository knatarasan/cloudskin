// To run in dev mode :   npx cypress run
// To run from terminal (creates video) :   npm run cypress:open

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Sign up", () => {
  it("Registration works", () => {
    cy.visit("/");

    cy.contains("Sign Up").click();

    cy.get('[data-testid="username"]').type("peter20");

    cy.get('[data-testid="email"]').type("peter20@gmail.com");

    cy.get('[data-testid="password"]').type("Honey200$");

    cy.get('[data-testid="confirmpassword"]').type("Honey200$");

    cy.get('[data-testid="firstname"]').type("Peter");

    cy.get('[data-testid="lastname"]').type("Hain");

    cy.get('[data-testid="submit"]').click();
  });
});

describe("login --> create a plan --> save plan ", () => {
  it("To Test plan creation ", () => {
    cy.visit("/login");

    cy.get('[data-testid="username"]').type("peter");
    cy.get('[data-testid="password"]').type("Honey200$");

    cy.get('[data-testid="submit"]').click();

    cy.get('[data-testid="create_plan"]').click();

    // cy.get('[disabled]').click({force: true})
    const dataTransfer = new DataTransfer();

    cy.get('[data-testid="App"]').trigger("dragstart", {
      dataTransfer,
      force: true,
    });

    cy.get('[data-testid="work-canvas"]').trigger("drop", {
      dataTransfer,
    });

    cy.get('[data-testid="nav-File"]').click();
    cy.get('[data-testid="nav-Save"]').click();

    // cy.get('div[data-testid="ref__node-46"]').click()
  });
});
