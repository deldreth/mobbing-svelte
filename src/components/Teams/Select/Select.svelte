<script>
  import { session, selectedTeamMembers } from "../../Session/store";
  import { teams } from "../store";

  import Quote from "../../Quote";

  function handleChangeTeam(event) {
    session.pickTeam(event.target.value);
  }
</script>

<div class="tile notification is-info is-child">
  <section id="team-select">
    <h4 class="title">Select Team</h4>
    <div class="select is-fullwidth">
      <select
        value={$session.teamId}
        on:change={handleChangeTeam}
        data-cy="team-select">
        {#each $teams as { id, name }, i}
          <option value={id}>{name}</option>
        {/each}
      </select>
    </div>

    {#if $selectedTeamMembers}
      <div class="selected-members is-primary" data-cy="team-selected-members">
        {$selectedTeamMembers.map(member => member.name).join(', ')}
      </div>
    {/if}
  </section>
</div>
