<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let editing;
  export let members;
</script>

{#if members.length > 0}
  <table class="table is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>Members</th>
        {#if editing}
          <th class="has-text-right">Remove</th>
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each members as member, i}
        <tr>
          <td>{member.name}</td>
          {#if editing}
            <td>
              <button
                on:click={() => {
                  console.log('click');
                  dispatch('remove', member.id);
                }}
                class="button is-warning is-small is-pulled-right"
                data-cy="remove-team-member">
                Remove
              </button>
            </td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
