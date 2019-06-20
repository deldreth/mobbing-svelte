<script>
  import { teams } from "../components/Team/store";

  import SelectTeam from "../components/Team/SelectTeam";
  import SelectTimes from "../components/Timers/SelectTimes";
  import Start from "../components/Start";
</script>

<style>
  #mobbing {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }
</style>

<svelte:head>
  <title>Mobs</title>
</svelte:head>

<section id="mobbing">
  <SelectTeam />

  {#if $teams.length > 0}
    <SelectTimes />

    <Start />
  {/if}
</section>
