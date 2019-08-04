<script>
  import { goto } from "@sapper/app";

  import { session, selectedTeamMembers } from "../../Session/store";
  import { teams } from "../store";
  import Quote from "../../Quote";

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

{#if $teams.length > 0}
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
        <div
          class="selected-members is-primary"
          data-cy="team-selected-members">
          {$selectedTeamMembers.map(member => member.name).join(', ')}
        </div>
      {/if}
    </section>
  </div>
{:else}
  <div class="create">
    <Quote
      message="Mob programming is a software development approach where the
      whole team works on the same thing, at the same time, in the same space,
      and at the same computer."
      attribution="Wikipedia"
      link="https://en.wikipedia.org/wiki/Mob_programming" />

    <button
      on:click={() => goto('teams')}
      class="button is-large is-primary"
      data-cy="create-team">
      Create Team
    </button>
  </div>
{/if}
