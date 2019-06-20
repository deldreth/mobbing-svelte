<script>
  import { teams } from "./store";

  export let teamId;

  let newMemberName = "";

  function handleChange(event) {
    newMemberName = event.target.value;

    if (event.code === "Enter" && newMemberName !== "") {
      teams.addMember(teamId, newMemberName);
      newMemberName = "";
    }
  }

  function handleAddMember() {
    teams.addMember(teamId, newMemberName);
    newMemberName = "";
  }
</script>

<style>
  #add-member {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
</style>

<section class="nes-container with-title is-dark" data-cy="add-member">
  <p class="title">Add New Member</p>
  <div id="add-member">
    <div class="nes-field">
      <input
        value={newMemberName}
        on:keyup={handleChange}
        id="member-name"
        type="text"
        class="nes-input is-dark"
        aria-describedby="button-add-member"
        placeholder="Name"
        data-cy="add-member-input" />
    </div>

    <div class="text-right">
      <button
        disabled={newMemberName === ''}
        class={`nes-btn ${newMemberName === '' && 'is-disabled'}`}
        type="button"
        id="button-add-member"
        on:click={handleAddMember}
        data-cy="add-member-button">
        Add Member
      </button>
    </div>
  </div>
</section>
