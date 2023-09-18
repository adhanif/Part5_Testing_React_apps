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
      cy.get("html").should("contain", "mluukkai is logged in");

      cy.createBlog({
        title: "CYPRES",
        author: "CYPRES",
        likes: "10",
        url: "CYPRES",
      });
      cy.get("html").should("contain", "CYPRES CYPRES");
      cy.contains("show").click();
      cy.contains("like").click();
    });

    it("A blog can be liked", function () {
      cy.get("html").should("contain", "mluukkai is logged in");

      cy.createBlog({
        title: "CYPRES1",
        author: "CYPRES1",
        likes: "100",
        url: "CYPRES",
      });
      cy.createBlog({
        title: "CYPRES2",
        author: "CYPRES2",
        likes: "100",
        url: "CYPRES",
      });
      cy.contains("CYPRES1 CYPRES1").parent().find("button").as("theButton");
      cy.get("@theButton").click();
      cy.contains("likes 100").parent().find("button").contains("like").click();
      cy.get("html").should("contain", "likes 101");
    });
  });

  describe("Registered user", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
      cy.get("html").should("contain", "mluukkai is logged in");
      cy.createBlog({
        title: "Delete CYPRES",
        author: "by CYPRE",
        likes: "100",
        url: "CYPRES",
      });
    });

    it("a blog can be deleted by its creater", function () {
      cy.contains("Delete CYPRES by CYPRE")
        .parent()
        .find("button")
        .contains("show")
        .click();
      cy.contains("remove").click();
      cy.get("html").should("not.contain", "show");
    });
  });
});
