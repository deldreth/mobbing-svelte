<script>
  import { goto } from "@sapper/app";

  import { teams } from "../components/Teams/store";

  import Quote from "../components/Quote";
  import SelectTeam from "../components/Teams/Select/Select";
  import SelectTimes from "../components/Timers/SelectTimes";
  import Start from "../components/Start";
</script>

<svelte:head>
  <title>Mobs</title>
</svelte:head>

{#if $teams.length > 0}
  <div id="mobbing" class="tile is-ancestor">
    <div class="tile is-vertical">
      <SelectTeam />

      <SelectTimes />

      <Start />
    </div>
  </div>
{:else}
  <Quote
    message="Teamwork is the ability to work together toward a common vision.
    The ability to direct individual accomplishments toward organizational
    objectives. It is the fuel that allows common people to attain uncommon
    results."
    attribution="Andrew Carnegie" />

  <section class="has-text-centered">
    <button
      on:click={() => goto('teams')}
      class="button is-large is-primary"
      data-cy="create-team">
      Create Team
    </button>
  </section>
{/if}
