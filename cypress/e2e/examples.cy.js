describe("Various examples", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });

  it("multi-page testing", () => {
    cy.location("pathname").should("equal", "/examples");

    cy.getDataTest("nav-why-cypress").click();
    cy.location("pathname").should("equal", "/");

    cy.getDataTest("nav-overview").click();
    cy.location("pathname").should("equal", "/overview");

    cy.getDataTest("nav-fundamentals").click();
    cy.location("pathname").should("equal", "/fundamentals");

    cy.getDataTest("nav-forms").click();
    cy.location("pathname").should("equal", "/forms");

    cy.getDataTest("nav-component").click();
    cy.location("pathname").should("equal", "/component");

    cy.getDataTest("nav-best-practices").click();
    cy.location("pathname").should("equal", "/best-practices");
  });

  //! Intercept Post
  it("Intercepts", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      //   body: { message: "successfully intercepted request" },
      //! response -> fixtures/example.json
      fixture: "example.json",
    });

    cy.getDataTest("post-button").click();
  });

  //   grudges

  it.only("grudges", () => {
    cy.contains(/add some grudges/i);

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });

    cy.getDataTest("grudge-title").should("have.text", "Add Some Grudges");

    cy.getDataTest("grudge-button").should("not.exist");

    cy.getDataTest("grudge-input").within(() => {
      cy.get("input").type("some grudge");
    });

    cy.getDataTest("add-grudge-button").click();

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });

    cy.getDataTest("grudge-title").should("have.text", "Grudges");

    cy.getDataTest("grudge-input").within(() => {
      cy.get("input").type("number 2");
    });

    cy.getDataTest("add-grudge-button").click();

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 2);
      cy.get("li").its(0).should("contain.text", "some grudge");
      cy.get("li").its(1).should("contain.text", "number 2");
    });

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li")
        .its(0)
        .within(() => {
          cy.get("button");
        })
        .click();
    });

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });

    cy.getDataTest("clear-button").click();

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });
  });
});
