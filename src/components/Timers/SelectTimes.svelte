<script>
  import { timers } from "./store";

  import Timers from "./Timers";
</script>

<style>
  .timers {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }

  .explainer {
    margin-top: 2rem;
  }

  @media (min-width: 480px) {
    .timers {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>

<section id="time-select" class="tile box is-info is-child">
  <p class="title">Times</p>

  <section>
    <div class="timers">
      <Timers key="session" />
      <Timers key="breakAfter" />
      <Timers key="breakDuration" />
    </div>

    <p class="explainer">
      Duration will be {$timers['session'].value * $timers['breakAfter'].value}
      minutes followed by a {$timers['breakDuration'].value} minute break.
    </p>
  </section>
</section>
