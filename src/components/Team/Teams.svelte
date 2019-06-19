<script>
  import { teams } from "./store";
  import AddTeam from "./AddTeam.svelte";
  import Team from "./Team.svelte";
</script>

<style>
  #teams {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }
</style>

<section id="teams">
  <div>
    <h4>Teams</h4>

    <AddTeam />
  </div>

  {#each Object.keys($teams) as teamId}
    <Team {teamId} />
  {/each}
</section>
