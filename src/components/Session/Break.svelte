<script>
  import { timers } from "../Timers/store";
  import { session, TYPE_SESSION, TYPE_BREAK } from "../Session/store";

  import Clock from "../Session/Clock";

  function handleStart() {
    timers.start($session.teamId, () => session.increment(), {
      resetTimer: true
    });

    session.reset();
    session.updateType(TYPE_SESSION);
  }

  function handleBreak() {
    timers.break(() => session.reset(), { resetTimer: true });
    session.updateType(TYPE_BREAK);
  }
</script>

<style>
  .title {
    margin-bottom: 0.75em;
  }

  .breaking {
    font-size: 2em;
    text-align: center;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 480px) {
    .actions {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
</style>

{#if $session.activeType === TYPE_BREAK}
  <section class="breaking">Break Time!</section>

  <Clock />
{/if}

{#if $session.activeType === TYPE_SESSION}
  <section class="text-center">
    <h2 class="title">Take a break?</h2>

    <div class="actions">
      <span />
      <button on:click={handleStart} class="nes-btn">Continue</button>
      <button on:click={handleBreak} class="nes-btn is-primary">Break</button>
      <span />
    </div>
  </section>
{/if}
