import { derived, writable } from "svelte/store";

import { teams } from "../Team/store";
import persistStore from "../../utils/persistStore";

export const TYPE_INACTIVE = "INACTIVE";
export const TYPE_SESSION = "SESSION";
export const TYPE_BREAK = "ON_BREAK";

function createSession() {
  const defaults = {
    version: 1,
    activeType: TYPE_INACTIVE, // TYPE_INACTIVE | TYPE_SESSION | TYPE_BREAK
    count: 0,
    teamId: null,
    breaking: false,
    skipped: []
  };

  const { subscribe, set, update } = writable(defaults);

  return {
    set,
    subscribe,
    increment: () =>
      update(session => ({ ...session, count: session.count + 1 })),
    skipRemove: memberId =>
      update(session => ({
        ...session,
        skipped: session.skipped.concat(memberId)
      })),
    reset: () =>
      update(session => ({
        ...defaults,
        activeType: TYPE_SESSION,
        teamId: session.teamId
      })),
    pickTeam: teamId => update(session => ({ ...session, teamId })),
    breaking: breaking => update(session => ({ ...session, breaking })),
    updateType: activeType => update(session => ({ ...session, activeType }))
  };
}

export const session = persistStore(createSession(), "session");

export const selectedTeamMembers = derived(
  [session, teams],
  ([$session, $teams]) => {
    if ($session.teamId) {
      return $teams.find(team => team.id === $session.teamId).members;
    }

    return null;
  }
);
