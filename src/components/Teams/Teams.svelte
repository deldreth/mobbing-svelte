<script>
  import { teams } from "./store";

  import Add from "./Add.svelte";
  import Team from "./Team/Team.svelte";
  import EditTeam from "./Edit/EditTeam.svelte";
</script>

<section id="teams" class="tile is-ancestor is-vertical">
  <div class="tile notification is-info is-child">
    <p class="title">Teams</p>

    <Add />
  </div>

  {#each $teams as team}
    <div class="tile box is-child" data-cy="team-container">
      {#if team.editing}
        <EditTeam {team} />
      {:else}
        <Team {team} />
      {/if}
    </div>
  {/each}
</section>
