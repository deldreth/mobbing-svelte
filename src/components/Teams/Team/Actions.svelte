<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let hasMembers;
</script>

<div class="actions has-text-right">
  <button
    on:click={() => dispatch('edit')}
    class="button"
    data-cy="edit-team-button">
    Edit
  </button>

  {#if hasMembers}
    <button
      on:click={() => dispatch('mob')}
      class="button is-primary"
      data-cy="mob-team-button">
      Mob with Team
    </button>
  {/if}
</div>
