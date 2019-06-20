<script>
  import { goto } from "@sapper/app";

  import {
    session,
    selectedTeamMembers,
    TYPE_SESSION
  } from "../components/Session/store";
  import { teams } from "../components/Team/store";
  import { timers } from "../components/Timers/store";

  $: disabled = !$session.teamId || $selectedTeamMembers.length < 2;

  function startMobbing() {
    teams.shuffleMembers($session.teamId);
    timers.start($session.teamId, () => session.increment(), {
      resetTimer: true
    });

    session.reset();
    session.updateType(TYPE_SESSION);

    goto("session");
  }
</script>

<style>
  .start {
    text-align: center;
  }

  .start button {
    width: 100%;
  }

  @media (min-width: 480px) {
    .start button {
      width: inherit;
    }
  }
</style>

<div class="start">
  <button
    on:click={startMobbing}
    {disabled}
    class={`nes-btn ${disabled ? 'is-disabled' : 'is-primary'}`}
    data-cy="shuffle-start">
    Shuffle & Start
  </button>
</div>
