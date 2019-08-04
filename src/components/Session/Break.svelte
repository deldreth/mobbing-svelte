<script>
  import { timers } from "../../components/Timers/store";
  import { session, TYPE_SESSION, TYPE_BREAK } from "../Session/store";

  import Clock from "../Session/Clock";

  function handleMob() {
    timers.start($session.teamId, () => session.increment(), {
      resetTimer: true
    });

    session.reset();
    session.updateType(TYPE_SESSION);
  }

  function handleStart() {
    timers.break(() => session.reset(), { resetTimer: true });
    session.updateType(TYPE_BREAK);
  }

  function handleContinue() {
    timers.start($session.teamId, () => session.increment());
  }

  function handlePause() {
    timers.pause();
  }
</script>

<section class="has-text-centered">
  {#if $session.activeType === TYPE_BREAK}
    <p class="title">Break Time!</p>

    <Clock />

    {#if $timers.paused}
      <button class="button is-primary is-rounded" on:click={handleContinue}>
        Continue
      </button>
    {:else}
      <button class="button is-rounded" on:click={handlePause}>Pause</button>
    {/if}
  {/if}

  {#if $session.activeType === TYPE_SESSION}
    <p class="title">Take a break?</p>

    <button on:click={handleMob} class="button is-rounded">
      Continue Mobbing
    </button>
    <button on:click={handleStart} class="button is-primary is-rounded">
      Break
    </button>
  {/if}
</section>
