<script>
  import { goto } from "@sapper/app";

  import { session, selectedTeamMembers } from "../Session/store";
  import { teams } from "../Team/store";

  function handleChangeTeam(event) {
    session.pickTeam(event.target.value);
  }
</script>

<style>
  #team-select .selected-members {
    margin-top: 1rem;
  }

  .create {
    text-align: center;
  }

  .create button {
    width: 100%;
  }

  @media (min-width: 480px) {
    .create button {
      width: inherit;
    }
  }
</style>

{#if Object.keys($teams).length > 0}
  <section id="team-select">
    <h4>Select Team</h4>
    <div class="nes-select">
      <select value={$session.teamId} on:change={handleChangeTeam}>
        {#each Object.keys($teams) as teamId, i}
          <option value={teamId}>{$teams[teamId].name}</option>
        {/each}
      </select>
    </div>

    {#if $selectedTeamMembers}
      <div class="selected-members nes-text is-primary">
         {$selectedTeamMembers.map(member => member.name).join(', ')}
      </div>
    {/if}
  </section>
{:else}
  <div class="create">
    <button on:click={() => goto('teams')} class="nes-btn is-primary btn-lg">
      Create Team
    </button>
  </div>
{/if}
