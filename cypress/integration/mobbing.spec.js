describe("Mobbing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("contains a <button/> with Create Team", () => {
    cy.get("[data-cy=create-team]").should("exist");
  });

  it("navigates to /teams", () => {
    cy.get("[data-cy=create-team]").click();
    cy.url().should("include", "/teams");
  });
});

describe("Mobbing with a team", () => {
  const timer = "[data-cy=timer]";

  before(() => {
    cy.visit("/");
    cy.setTeams();
    cy.setSession();
    cy.reload();
  });

  it("renders three timers", () => {
    cy.get(timer).should("have.length", 3);
  });

  [["session", 7], ["breakAfter", 12], ["breakDuration", 12]].forEach(
    ([key, value]) => {
      describe(`${key} timer`, () => {
        const timerInput = `[data-cy=timer-${key}-input]`;
        const timerMinus = `[data-cy=timer-${key}-minus-button]`;
        const timerPlus = `[data-cy=timer-${key}-plus-button]`;

        it("should handle clicking", () => {
          cy.get(timerMinus)
            .should("exist")
            .click();
          cy.get(timerPlus)
            .should("exist")
            .click()
            .click()
            .click();
        });

        it(`should have the expected value ${value}`, () => {
          cy.get(timerInput)
            .should("exist")
            .invoke("val")
            .should("include", value);
        });
      });
    }
  );

  describe("Team Select", () => {
    const teamSelect = "[data-cy=team-select]";
    const teamSelectedMembers = "[data-cy=team-selected-members]";

    it("should have a default value", () => {
      cy.get(teamSelect)
        .should("exist")
        .select("MUgfGda1K8SJ1OzZc6Knb")
        .should("have.value", "MUgfGda1K8SJ1OzZc6Knb");

      cy.get(teamSelectedMembers).should("have.text", "One, Two, Three, Four");
    });

    it("should change teams", () => {
      cy.get(teamSelect)
        .select("1234")
        .should("have.value", "1234");
      cy.get(teamSelectedMembers).should(
        "have.text",
        "Five, Six, Seven, Eight"
      );
    });
  });
});
