<script>
  import { queue } from "../components/Queue/store";
  import { session } from "../components/Session/store";

  import Clock from "../components/Session/Clock";
  import Actions from "../components/Session/Actions";
  import Queue from "../components/Session/Queue";
  import Break from "../components/Session/Break";
</script>

{#if $queue.length > 0}
  <Queue />

  <Clock />

  <Actions />
{:else}
  <Break />
{/if}
