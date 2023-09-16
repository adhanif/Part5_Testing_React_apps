describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "mluukkai",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.visit("http://localhost:5173");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login");
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.contains("login").click();
      cy.contains("mluukkai is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login");
      cy.get("#username").type("mluukkai2");
      cy.get("#password").type("salainen");
      cy.contains("login").click();
      cy.contains('wrong username or password');
    });
  });
});
