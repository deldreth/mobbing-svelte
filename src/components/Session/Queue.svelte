<script>
  import { queue } from "../Queue/store";

  import Break from "./Break";
</script>

<style>
  .queue {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  .queue section {
    font-size: 2rem;
    text-align: center;
  }

  .ondeck {
    text-align: center;
  }
</style>

<section class="queue">
  {#if $queue.length > 0}
    <section class="nes-text is-primary">Driver: {$queue[0].name}</section>
  {/if}

  {#if $queue.length < 2}
    <section class="nes-text is-success">Break</section>
  {:else}
    <section>Navigator: {$queue[1].name}</section>

    {#if $queue.length > 2}
      <div class="ondeck text-dark">
        On deck: {$queue
          .map(member => member.name)
          .filter((member, i, s) => s.indexOf(member) === i && i > 1)
          .join(', ')}
      </div>
    {/if}
  {/if}
</section>
