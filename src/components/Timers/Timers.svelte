<script>
  import { timers } from "./store";

  export let key;

  $: timer = $timers[key];

  function handleIncrement() {
    timers.increment(key);
  }

  function handleDecrement() {
    timers.decrement(key);
  }
</script>

<style>
  .group {
    display: flex;
  }

  .group input {
    flex: 1;
    margin: 0 0.5rem 0 0.5rem;
  }
</style>

<section data-cy="timer">
  <label>{timer.label}</label>
  <div class="group">
    <button
      on:click={handleDecrement}
      class="nes-btn"
      type="button"
      id="button-addon1"
      data-cy={`timer-${key}-minus-button`}>
      <i class="fas fa-minus fa-fw" />
    </button>

    <input
      value={`${timer.value} ${timer.suffix}`}
      readonly
      type="text"
      class="nes-input"
      placeholder=""
      aria-label="Example text with button addon"
      aria-describedby="button-addon1"
      data-cy={`timer-${key}-input`} />

    <button
      on:click={handleIncrement}
      class="nes-btn"
      type="button"
      id="button-addon2"
      data-cy={`timer-${key}-plus-button`}>
      <i class="fas fa-plus fa-fw" />
    </button>
  </div>
</section>
