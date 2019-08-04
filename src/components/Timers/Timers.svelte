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
      disabled={timer.value <= 1}
      class="button is-light"
      type="button"
      id="button-addon1"
      data-cy={`timer-${key}-minus-button`}>
      <span class="icon is-small">
        <i class="fas fa-minus fa-fw" />
      </span>
    </button>

    <input
      value={`${timer.value} ${timer.suffix}`}
      readonly
      type="text"
      class="input"
      placeholder=""
      aria-label="Example text with button addon"
      aria-describedby="button-addon1"
      data-cy={`timer-${key}-input`} />

    <button
      on:click={handleIncrement}
      class="button is-light"
      type="button"
      id="button-addon2"
      data-cy={`timer-${key}-plus-button`}>
      <span class="icon is-small">
        <i class="fas fa-plus fa-fw" />
      </span>
    </button>
  </div>
</section>
