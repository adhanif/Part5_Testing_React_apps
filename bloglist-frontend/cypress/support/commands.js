Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    console.log(body);
    localStorage.setItem("loggedBlogUser", JSON.stringify(body));
    cy.visit("http://localhost:5173");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, likes, url }) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: { title, author, likes, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedBlogUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:5173");
});
