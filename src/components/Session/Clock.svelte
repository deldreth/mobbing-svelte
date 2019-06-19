<script>
  import classNames from "classnames";

  import { queue } from "../Queue/store";
  import { session } from "../Session/store";
  import { timers } from "../Timers/store";

  import PauseButton from "./PauseButton";

  export let displayActions = true;

  $: clockClasses = classNames("clock", {
    "nes-text is-disabled": $timers.paused
  });
</script>

<style>
  #clock {
    margin: 0 0 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #clock .clock {
    font-size: 4em;
  }
</style>

{#if $timers.remainder > 0}
  <div id="clock" class="text-center">
    <div class={clockClasses}>{$timers.timer}</div>

    {#if displayActions}
      <PauseButton />
    {/if}
  </div>
{/if}
