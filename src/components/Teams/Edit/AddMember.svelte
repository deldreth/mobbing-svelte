<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let newMemberName = "";

  function handleChange(event) {
    newMemberName = event.target.value;
  }

  function handleSubmit() {
    dispatch("add", newMemberName);
    newMemberName = "";
  }
</script>

<form on:submit|preventDefault={handleSubmit} data-cy="add-member">
  <div id="add-member">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">New Member</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input
              value={newMemberName}
              on:keyup={handleChange}
              id="member-name"
              type="text"
              class="input"
              aria-describedby="button-add-member"
              placeholder="Name"
              data-cy="add-member-input" />
          </p>
        </div>
      </div>
    </div>

    <div class="control has-text-right">
      <button
        disabled={newMemberName === ''}
        class="button"
        type="submit"
        id="button-add-member"
        data-cy="add-member-button">
        Add Member
      </button>
    </div>
  </div>
</form>
