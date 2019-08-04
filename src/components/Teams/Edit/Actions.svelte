<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let editing;
</script>

<div class="actions has-text-right">
  <button
    on:click={() => dispatch('delete')}
    class="button is-danger"
    data-cy="delete-team-button">
    Delete
  </button>
  <button
    on:click={() => dispatch('save')}
    class="button is-primary"
    data-cy="save-team-button">
    Save
  </button>
</div>
