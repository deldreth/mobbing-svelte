import { writable } from "svelte/store";
import nanoid from "nanoid";

import persistStore from "../../utils/persistStore";
import shuffle from "../../utils/shuffle";

function createTeam() {
  const { subscribe, set, update } = writable({});

  return {
    set,
    subscribe,
    addTeam: (name, onAdd) =>
      update(teams => {
        Object.keys(teams).forEach(id => {
          teams[id].editing = false;
        });

        const id = nanoid();

        teams[id] = {
          name,
          members: [],
          editing: true
        };

        onAdd(id);

        return teams;
      }),
    removeTeam: teamId =>
      update(teams => {
        delete teams[teamId];
        return teams;
      }),
    addMember: (teamId, name) =>
      update(teams => ({
        ...teams,
        [teamId]: {
          ...teams[teamId],
          members: teams[teamId].members.concat({
            id: nanoid(),
            name
          })
        }
      })),
    shuffleMembers: teamId =>
      update(teams => ({
        ...teams,
        [teamId]: {
          ...teams[teamId],
          members: shuffle(teams[teamId].members)
        }
      })),
    removeMember: (teamId, memberId) =>
      update(teams => ({
        ...teams,
        [teamId]: {
          ...teams[teamId],
          members: teams[teamId].members.filter(
            member => member.id !== memberId
          )
        }
      })),
    rotateMembers: teamId =>
      update(teams => {
        const members = teams[teamId].members;
        const current = members.shift();

        return {
          ...teams,
          [teamId]: {
            ...teams[teamId],
            members: members.concat(current)
          }
        };
      }),
    edit: teamId =>
      update(teams => {
        Object.keys(teams).forEach(id => {
          if (id === teamId) {
            teams[id].editing = true;
          } else {
            teams[id].editing = false;
          }
        });

        return teams;
      }),
    save: teamId =>
      update(teams => {
        Object.keys(teams).forEach(id => {
          teams[id].editing = false;
        });

        return teams;
      })
  };
}

export const teams = persistStore(createTeam(), "teams");
