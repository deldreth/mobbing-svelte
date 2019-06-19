<script>
  import { teams } from "../Team/store";

  export let removable;
  export let teamId;
  export let id;

  function handleRemove() {
    teams.removeMember(teamId, id);
  }
</script>

<style>
  .person {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

{#if !removable}
  <div id={`person-${teamId}-${id}`} class="person btn btn-secondary">
    <slot />
  </div>
{:else}
  <button
    on:click={handleRemove}
    id={`person-${teamId}-${id}`}
    class="person btn btn-danger">
    <i class="fas fa-times" />
    <slot />
  </button>
{/if}
