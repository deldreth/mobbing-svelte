<script>
  import { teams } from "../components/Teams/store";

  import SelectTeam from "../components/Teams/Select/Select";
  import SelectTimes from "../components/Timers/SelectTimes";
  import Start from "../components/Start";
</script>

<style>
  #mobbing {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
</style>

<svelte:head>
  <title>Mobs</title>
</svelte:head>

<section id="mobbing" class="tile is-ancestor">
  <SelectTeam />

  {#if $teams.length > 0}
    <SelectTimes />

    <Start />
  {/if}
</section>
