describe("Teams", () => {
  let team = "[data-cy=team-container]";
  let teamInput = "[data-cy=add-team-input]";
  let teamButton = "[data-cy=add-team-button]";
  let addMember = "[data-cy=add-member]";

  before(() => {
    cy.visit("/teams");
  });

  it("contains an <input/> to create a new team", () => {
    expect(cy.get(teamInput)).to.exist;
    expect(cy.get(teamButton)).to.exist;
  });

  it("adds a new team", () => {
    cy.get(teamInput).type("Awesome Team");
    cy.get(teamButton).click();

    expect(cy.get(addMember)).to.exist;
  });

  describe("New team members", () => {
    let addMemberInput = "[data-cy=add-member-input]";
    let addMemberButton = "[data-cy=add-member-button]";
    let removeMemberButton = "[data-cy=remove-team-member]";

    it("adds four new members", () => {
      ["First", "Second", "Third", "Fourth"].forEach(name => {
        cy.get(addMemberInput).type(name);
        cy.get(addMemberButton).click();
      });

      cy.get(removeMemberButton).should("have.length", 4);
    });

    it("removes the fourth member", () => {
      cy.get(removeMemberButton)
        .last()
        .click();
      cy.get(removeMemberButton).should("have.length", 3);
    });
  });

  describe("Adding a second team", () => {
    let deleteTeamButton = "[data-cy=delete-team-button]";

    it("adds a new team", () => {
      cy.get(teamInput).type("Second team");
      cy.get(teamButton).click();

      expect(cy.get(addMember)).to.exist;
      cy.get(team).should("have.length", 2);
    });

    it("deletes the team", () => {
      cy.get(deleteTeamButton).click();
      cy.get(team).should("have.length", 1);
    });
  });

  describe("Editing the first team", () => {
    let teamNameInput = "[data-cy=team-name-input]";
    let editTeamButton = "[data-cy=edit-team-button]";
    let saveTeamButton = "[data-cy=save-team-button]";

    it("toggles editing", () => {
      const edit = cy.get(editTeamButton);
      edit.click();
      edit.should("not.exist");

      const save = cy.get(saveTeamButton);
      save.should("exist");
    });

    it("changes the first team's name", () => {
      const name = "Next Team Name";
      cy.get(teamNameInput)
        .clear()
        .type(name);
      cy.get(`${team} .title`).should("contain", name);
    });

    it("saves the team", () => {
      const save = cy.get(saveTeamButton);
      save.click();
      save.should("not.exist");

      const edit = cy.get(editTeamButton);
      edit.should("exist");
    });
  });

  describe("Picking a team", () => {
    const mobTeamButton = "[data-cy=mob-team-button]";

    it("picks the only team", () => {
      cy.get(mobTeamButton).click();
      cy.url().should("include", "/");
    });
  });
});
