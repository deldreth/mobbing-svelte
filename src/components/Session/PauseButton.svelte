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
  <button class="nes-btn is-primary btn-lg" on:click={handlePlay}>
    Continue
  </button>
{:else}
  <button class="nes-btn btn-lg" on:click={handlePause}>Pause</button>
{/if}
