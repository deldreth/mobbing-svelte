<script>
  import { goto } from "@sapper/app";

  import { queue } from "../components/Queue/store";
  import { session } from "../components/Session/store";
  import { teams } from "../components/Teams/store";
  import { timers } from "../components/Timers/store";

  import Actions from "../components/Session/Actions";
  import Break from "../components/Session/Break";
  import Clock from "../components/Session/Clock";
  import Queue from "../components/Session/Queue";
  import Quote from "../components/Quote";
</script>

{#if $teams.length > 0}
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
{:else}
  <Quote
    message="Teamwork is the ability to work together toward a common vision.
    The ability to direct individual accomplishments toward organizational
    objectives. It is the fuel that allows common people to attain uncommon
    results."
    attribution="Andrew Carnegie" />

  <section class="has-text-centered">
    <button
      on:click={() => goto('teams')}
      class="button is-large is-primary"
      data-cy="create-team">
      Create Team
    </button>
  </section>
{/if}
