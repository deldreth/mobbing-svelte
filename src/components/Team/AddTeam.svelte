<script>
  import { teams } from "./store";
  import { session } from "../Session/store";

  let newTeamName = "";

  function handleChange(event) {
    newTeamName = event.target.value;

    if (event.code === "Enter" && newTeamName !== "") {
      teams.addTeam(newTeamName, session.pickTeam);
      newTeamName = "";
    }
  }

  function handleAddTeam() {
    if (newTeamName !== "") {
      teams.addTeam(newTeamName, session.pickTeam);
      newTeamName = "";
    }
  }
</script>

<style>
  #add-team {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 480px) {
    #add-team {
      grid-template-columns: 2fr 1fr;
    }
  }
</style>

<div id="add-team">
  <div class="nes-field">
    <input
      value={newTeamName}
      on:keyup={handleChange}
      type="text"
      class="nes-input"
      id="add-team-member"
      aria-describedby="button-add-member"
      placeholder="New team" />
  </div>

  <button
    disabled={newTeamName === ''}
    on:click={handleAddTeam}
    class={`nes-btn ${newTeamName === '' ? 'is-disabled' : 'is-primary'}`}
    type="button"
    id="button-add-member">
    Add Team
  </button>
</div>
