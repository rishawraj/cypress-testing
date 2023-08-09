describe("form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });
  it("Test subscribe form", () => {
    cy.contains(/testing forms/i);

    // alias ```.as()```
    cy.getDataTest("subscribe-form").find("input").as("input");

    cy.get("@input").type("rishawraj@gmail.com");
    cy.contains(/successfully subbed: rishawraj@gmail.com!/i).should(
      "not.exist"
    );
    cy.getDataTest("subscribe-button").click();
    cy.contains(/successfully subbed: rishawraj@gmail.com!/i).should("exist");
    cy.wait(3000);
    cy.contains(/successfully subbed: rishawraj@gmail.com!/i).should(
      "not.exist"
    );

    cy.get("@input").type("riahwraj@gmail.io");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/invalid email/i).should("exist");
    cy.wait(3000);
    cy.contains(/invalid email/i).should("not.exist");

    cy.contains(/fail!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/fail!/i).should("exist");
  });
});
