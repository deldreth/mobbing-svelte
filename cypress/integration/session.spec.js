describe("Session without data", () => {
  beforeEach(() => {
    cy.visit("/session");
  });

  it("renders a create team button", () => {
    cy.get("[data-cy=create-team]").should("exist");
  });
});

describe("Session", () => {
  //   const teams = [
  //     {
  //       id: "nzFO1QbUUVTXss8niUQrw",
  //       name: "Voltron",
  //       members: [
  //         { id: "i4M_fOmdae7SEoeRphuXN", name: "One" },
  //         { id: "uLVqzGI3uUbTaS7q5wQIl", name: "Two" },
  //         { id: "CanMuwQ8THpb_xM0UtvQ5", name: "Three" }
  //       ],
  //       editing: false
  //     }
  //   ];

  //   const timers = {
  //     version: 1,
  //     paused: true,
  //     remainder: 297898,
  //     timer: "04:57",
  //     session: { label: "Session Time", value: 1, suffix: "minutes" },
  //     breakAfter: { label: "Break After", value: 10, suffix: "sessions" },
  //     breakDuration: { label: "Break Length", value: 10, suffix: "minutes" }
  //   };

  //   const session = {
  //     version: 1,
  //     activeType: "INACTIVE",
  //     count: 0,
  //     teamId: "nzFO1QbUUVTXss8niUQrw",
  //     breaking: false,
  //     skipped: []
  //   };

  beforeEach(() => {
    cy.setTeams();
    cy.setSession();
    cy.setTimers();
    cy.visit("/session");
  });

  it("renders a driver", () => {
    cy.get("[data-cy=queue-driver")
      .should("exist")
      .get(".subtitle")
      .contains("One");
  });

  it("renders a navigator", () => {
    cy.get("[data-cy=queue-navigator")
      .should("exist")
      .get(".subtitle")
      .contains("Two");
  });

  it("renders an on deck", () => {
    cy.get("[data-cy=queue-deck")
      .should("exist")
      .get(".subtitle")
      .contains("Three, Four");
  });

  describe("Queue controls", () => {
    it("skips the driver", () => {
      cy.get("[data-cy=queue-skip-driver")
        .should("exist")
        .click();

      cy.get("[data-cy=queue-driver").contains("Two");

      cy.get("[data-cy=queue-navigator").contains("Three");
    });

    it("removes the driver", () => {
      cy.get("[data-cy=queue-remove-driver")
        .should("exist")
        .click();

      cy.get("[data-cy=queue-driver").contains("Two");

      cy.get("[data-cy=queue-navigator").contains("Three");

      cy.get("[data-cy=queue-deck").contains("Four");
    });

    it("ends the session", () => {
      cy.get("[data-cy=queue-end-session")
        .should("exist")
        .click();

      cy.url().should("include", "/");
    });
  });

  describe("Timer controls", () => {
    it("starts the session", () => {
      cy.get("[data-cy=queue-continue")
        .should("exist")
        .click();

      cy.get("[data-cy=queue-pause")
        .should("exist")
        .click();
    });

    it("checks the timer", () => {
      cy.get("[data-cy=queue-continue").click();

      cy.get("[data-cy=clock").should("exist");
    });

    // it("pauses the timer", () => {
    //   cy.get("[data-cy=queue-continue").click();

    //   cy.get("[data-cy=queue-pause")
    //     .should("exist")
    //     .click();
    // });
  });
});
