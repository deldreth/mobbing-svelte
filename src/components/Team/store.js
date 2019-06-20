import { writable } from "svelte/store";
import nanoid from "nanoid";

import persistStore from "../../utils/persistStore";
import shuffle from "../../utils/shuffle";

function createTeam() {
  // Team structure
  // [{ id, name, members, editing }]
  const { subscribe, set, update } = writable([]);

  return {
    set,
    subscribe,
    addTeam: (name, onAdd) =>
      update(teams => {
        teams.forEach(team => (team.editing = false));

        const id = nanoid();

        teams.unshift({
          id,
          name,
          members: [],
          editing: true
        });

        onAdd(id);

        return teams;
      }),
    removeTeam: teamId =>
      update(teams => teams.filter(team => team.id !== teamId)),
    addMember: (teamId, name) =>
      update(teams => {
        teams.forEach(team => {
          if (team.id === teamId) {
            team.members = team.members.concat({
              id: nanoid(),
              name
            });
          }
        });

        return teams;
      }),
    removeMember: (teamId, memberId) =>
      update(teams => {
        teams.forEach(team => {
          if (team.id === teamId) {
            team.members = team.members.filter(
              member => member.id !== memberId
            );
          }
        });

        return teams;
      }),
    shuffleMembers: teamId =>
      update(teams => {
        teams.forEach(team => {
          if (team.id === teamId) {
            team.members = shuffle(team.members);
          }
        });

        return teams;
      }),
    edit: teamId =>
      update(teams => {
        teams.forEach(team => {
          if (team.id === teamId) {
            team.editing = true;
          } else {
            team.editing = false;
          }
        });

        return teams;
      }),
    save: teamId =>
      update(teams => {
        teams.forEach(team => {
          team.editing = false;
        });

        return teams;
      })
  };
}

export const teams = persistStore(createTeam(), "teams");
