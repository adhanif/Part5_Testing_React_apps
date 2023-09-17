describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "mluukkai",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.visit("http://localhost:5173");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "mluukkai", password: "salainen" });
      cy.contains("mluukkai is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai2");
      cy.get("#password").type("wrong");
      cy.contains("login").click();
      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
      cy.get("html").should("not.contain", "mluukkai2 logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });
    it("A new blog can be created", function () {
      cy.wait(2000);
      cy.get("html").should("contain", "mluukkai is logged in");

      cy.createBlog({
        title: "CYPRES",
        author: "CYPRES",
        likes: "100",
        url: "CYPRES",
      });
      cy.get("html").should("contain", "CYPRES CYPRES");
    });
  });
});
