<script>
  import { goto } from "@sapper/app";

  import { teams } from "./store";
  import { session } from "../Session/store";

  import AddMember from "./AddMember.svelte";

  export let teamId;

  $: team = $teams[teamId];

  function toggleEditing() {
    if (team.editing) {
      teams.save(teamId);
    } else {
      teams.edit(teamId);
    }
  }

  function handleRemove() {
    teams.removeTeam(teamId);
  }

  function handleSelectTeam() {
    session.pickTeam(teamId);
    goto("/");
  }

  function handleRemoveMember(memberId) {
    teams.removeMember(teamId, memberId);
  }
</script>

<style>
  #team {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 480px) {
    .actions {
      display: flex;
      justify-content: flex-end;
    }

    .actions button {
      margin-left: 2rem;
    }
  }
</style>

<div class="nes-container with-title">
  <div class="title">{team.name}</div>
  <div id="team">
    {#if team.editing}
      <div class="nes-field">
        <label for="team-name">Team name</label>
        <input
          bind:value={team.name}
          id="team-name"
          type="text"
          class="nes-input edit-name" />
      </div>

      <AddMember {teamId} />
    {/if}

    <table class="nes-table is-centered" width="99%">
      <thead>
        <tr>
          <th>Members</th>
          {#if team.editing}
            <th>Remove</th>
          {/if}
        </tr>
      </thead>
      <tbody>
        {#each team.members as member, i}
          <tr>
            <td>{member.name}</td>
            {#if team.editing}
              <td class="text-right">
                <button
                  on:click={() => handleRemoveMember(member.id)}
                  class="nes-btn is-warning btn-sm">
                  Remove
                </button>
              </td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="actions">
      {#if !team.editing}
        <button on:click={toggleEditing} class="nes-btn">Edit</button>

        <button on:click={handleSelectTeam} class="nes-btn is-primary">
          Mob with Team
        </button>
      {:else}
        <button on:click={handleRemove} class="nes-btn is-error">Delete</button>
        <button on:click={toggleEditing} class="nes-btn is-primary">
          Save
        </button>
      {/if}
    </div>
  </div>
</div>
