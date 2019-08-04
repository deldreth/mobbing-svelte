<script>
  import { goto } from "@sapper/app";

  import { teams } from "../store";
  import { session } from "../../Session/store";

  import AddMember from "./AddMember.svelte";
  import MemberTable from "../MemberTable.svelte";
  import Actions from "./Actions.svelte";

  export let team;

  function toggleEditing() {
    teams.save(team.id);
  }

  function handleRemove() {
    teams.removeTeam(team.id);

    if ($session.teamId && $session.teamId === team.id) {
      session.pickTeam(null);
    }
  }

  function handleRemoveMember(event) {
    teams.removeMember(team.id, event.detail);
  }

  function handleAddMember(event) {
    teams.addMember(team.id, event.detail);
  }
</script>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Team name</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control">
        <input
          bind:value={team.name}
          id="team-name"
          type="text"
          class="input edit-name"
          data-cy="team-name-input" />
      </p>
    </div>
  </div>
</div>

<div class="team tile notification is-vertical is-parent">
  <div class="tile is-child">
    <AddMember on:add={handleAddMember} />
  </div>

  <div class="tile is-child">
    <MemberTable
      editing
      on:remove={handleRemoveMember}
      members={team.members} />
  </div>
</div>

<Actions editing on:delete={handleRemove} on:save={toggleEditing} />
