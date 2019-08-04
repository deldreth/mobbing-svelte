<script>
  import { goto } from "@sapper/app";

  import { timers } from "../Timers/store";
  import { queue } from "../Queue/store";
  import { session, TYPE_INACTIVE } from "./store";

  function handleContinue() {
    timers.start($session.teamId, () => session.increment(), {
      resetTimer: true
    });
  }

  function handleSkip() {
    session.increment();
  }

  function handleSkipRemove() {
    session.skipRemove($queue[0].id);
  }

  function handleEnd() {
    session.updateType(TYPE_INACTIVE);
    goto("/", { replaceState: true });
  }

  function handlePlay() {
    timers.start($session.teamId, () => session.increment());
  }

  function handlePause() {
    timers.pause();
  }
</script>

<div class="has-text-centered">
  {#if $timers.paused || $timers.remainder === 0}
    <button
      on:click={handleSkip}
      class="skip button is-info is-rounded"
      data-cy="queue-skip-driver">
      Skip Driver
    </button>

    <button
      on:click={handleSkipRemove}
      class="remove button is-warning is-rounded"
      data-cy="queue-remove-driver">
      Remove Driver
    </button>

    <button
      on:click={handleEnd}
      class="end button is-danger is-rounded"
      data-cy="queue-end-session">
      End Session
    </button>

    {#if $timers.remainder === 0}
      <button
        on:click={handleContinue}
        class="continue button is-primary is-rounded"
        data-cy="queue-continue">
        Continue
      </button>
    {/if}
  {/if}

  {#if $timers.remainder > 0}
    {#if $timers.paused}
      <button
        class="button is-primary is-rounded"
        on:click={handlePlay}
        data-cy="queue-start">
        Continue
      </button>
    {:else}
      <button
        class="button is-rounded"
        on:click={handlePause}
        data-cy="queue-pause">
        Pause
      </button>
    {/if}
  {/if}
</div>
