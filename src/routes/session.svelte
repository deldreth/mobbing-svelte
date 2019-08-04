<script>
  import { queue } from "../components/Queue/store";
  import { session } from "../components/Session/store";
  import { timers } from "../components/Timers/store";

  import Clock from "../components/Session/Clock";
  import Actions from "../components/Session/Actions";
  import Queue from "../components/Session/Queue";
  import Break from "../components/Session/Break";
</script>

<section class="tile is-ancestor">
  <div class="tile is-vertical">
    {#if $queue.length > 0}
      <div class="tile is-vertical">
        <Queue />
      </div>

      <div class="tile is-child">
        <Clock />
      </div>

      <div class="tile is-child">
        <Actions />
      </div>
    {:else}
      <Break />
    {/if}
  </div>
</section>
