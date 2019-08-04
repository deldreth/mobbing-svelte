<script>
  import { teams } from "./store";
  import { session } from "../Session/store";

  let newTeamName = "";

  function handleChange(event) {
    newTeamName = event.target.value;
  }

  function handleSubmit() {
    teams.addTeam(newTeamName, session.pickTeam);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div id="add-team">
    <div class="field">
      <input
        value={newTeamName}
        on:keyup={handleChange}
        type="text"
        class="input"
        id="add-team-member"
        aria-describedby="button-add-member"
        placeholder="New team name"
        data-cy="add-team-input" />
    </div>

    <div class="control has-text-right">
      <button
        disabled={newTeamName === ''}
        class="button is-info is-inverted"
        type="submit"
        id="button-add-member"
        data-cy="add-team-button">
        Add Team
      </button>
    </div>
  </div>
</form>
