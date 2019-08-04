<script>
  import classNames from "classnames";

  import { queue } from "../Queue/store";
  import { session } from "../Session/store";
  import { timers } from "../Timers/store";

  import PauseButton from "./PauseButton";

  $: clockClasses = classNames({
    "is-disabled": $timers.paused
  });
</script>

<style>
  #clock {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 4em;
  }
</style>

{#if $timers.remainder > 0}
  <div id="clock">
    <div class={clockClasses}>{$timers.timer}</div>
  </div>
{/if}
