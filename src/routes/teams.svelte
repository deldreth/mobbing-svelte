<script>
  import { teams } from "../components/Teams/store";

  import Quote from "../components/Quote";
  import Teams from "../components/Teams/Teams.svelte";
</script>

<svelte:head>
  <title>Teams</title>
</svelte:head>

<Teams />

{#if $teams.length === 0}
  <Quote
    message="Teamwork is the ability to work together toward a common vision.
    The ability to direct individual accomplishments toward organizational
    objectives. It is the fuel that allows common people to attain uncommon
    results."
    attribution="Andrew Carnegie" />
{/if}
