<script>
  import { queue } from "../Queue/store";
</script>

<div class="tile">
  <div class="tile is-parent">
    <div class="tile is-child notification is-primary" data-cy="queue-driver">
      <p class="title">Driver</p>
      {#if $queue.length > 0}
        <p class="subtitle">{$queue[0].name}</p>
      {/if}
    </div>
  </div>

  {#if $queue.length > 1}
    <div class="tile is-parent">
      <div
        class="tile is-child notification is-info "
        data-cy="queue-navigator">
        <p class="title">Navigator</p>
        <p class="subtitle">{$queue[1].name}</p>
      </div>
    </div>
  {:else}
    <div class="tile is-parent">
      <div class="tile is-child notification is-warning">
        <p class="title">Break</p>
      </div>
    </div>
  {/if}
</div>

{#if $queue.length > 2}
  <div class="tile is-parent">
    <div class="tile is-child box is-warning" data-cy="queue-deck">
      <p class="title">On Deck</p>
      <p class="subtitle">
        {$queue
          .map(member => member.name)
          .filter((member, i, s) => s.indexOf(member) === i && i > 1)
          .join(', ')}
      </p>
    </div>
  </div>
{/if}
