Cypress.Commands.add("setTimers", () => {
  cy.fixture("timers.json").then(fixture =>
    window.localStorage.setItem("timers", JSON.stringify(fixture))
  );
});

Cypress.Commands.add("setTeams", () => {
  cy.fixture("teams.json").then(fixture =>
    window.localStorage.setItem("teams", JSON.stringify(fixture))
  );
});

Cypress.Commands.add("setSession", () => {
  cy.fixture("session.json").then(fixture =>
    window.localStorage.setItem("session", JSON.stringify(fixture))
  );
});

Cypress.Commands.add("updateTimers", next => {
  cy.fixture("session.json").then(fixture => {
    const mergedFixture = {
      ...fixture,
      ...next
    };

    window.localStorage.setItem("timers", JSON.stringify(mergedFixture));
  });
});
