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
</script>

<style>
  #actions {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 480px) {
    #actions {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .continue {
      grid-area: 1 / 2 / 2 / 3;

      margin-top: 2rem;
    }

    .skip {
      grid-area: 2 / 1 / 3 / 2;
    }

    .remove {
      grid-area: 2 / 2 / 3 / 3;
    }

    .end {
      grid-area: 2 / 3 / 3 / 4;
    }
  }
</style>

<section id="actions">
  {#if $timers.remainder === 0}
    <button
      on:click={handleContinue}
      class="continue nes-btn is-primary btn-lg">
      Continue
    </button>
  {/if}

  {#if $timers.paused || $timers.remainder === 0}
    <button on:click={handleSkip} class="skip nes-btn btn-sm">
      Skip Driver
    </button>

    <button
      on:click={handleSkipRemove}
      class="remove nes-btn is-warning btn-sm">
      Remove Driver
    </button>

    <button on:click={handleEnd} class="end nes-btn is-error btn-sm">
      End Session
    </button>
  {/if}
</section>
