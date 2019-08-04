<script>
  import { goto } from "@sapper/app";

  import { teams } from "../store";
  import { session } from "../../Session/store";

  import MemberTable from "../MemberTable.svelte";
  import Actions from "./Actions.svelte";

  export let team;

  function toggleEditing() {
    teams.edit(team.id);
  }

  function handleSelectTeam() {
    session.pickTeam(team.id);
    goto("/");
  }
</script>

<style>
  .team {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
</style>

<p class="title">{team.name}</p>
{#if team.members.length === 0}
  <p class="subtitle has-text-danger">No members</p>
{/if}

<div class="team">
  <MemberTable members={team.members} />

  <Actions
    hasMembers={team.members.length > 0}
    on:edit={toggleEditing}
    on:mob={handleSelectTeam} />
</div>
