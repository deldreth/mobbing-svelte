<script>
  import { createEventDispatcher } from "svelte";

  import { session } from "../Session/store";
  import { timers } from "../Timers/store";

  const dispatch = createEventDispatcher();

  function handlePlay() {
    timers.start($session.teamId, () => session.increment());
  }

  function handlePause() {
    timers.pause();
  }
</script>

{#if $timers.paused}
  <button class="button is-primary" on:click={handlePlay}>Continue</button>
{:else}
  <button class="button" on:click={handlePause}>Pause</button>
{/if}
