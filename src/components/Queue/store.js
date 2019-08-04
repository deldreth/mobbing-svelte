import { derived } from "svelte/store";

import { session } from "../Session/store";
import { teams } from "../Teams/store";
import { timers } from "../Timers/store";

export const queue = derived(
  [session, teams, timers],
  ([$session, $teams, $timers]) => {
    const teamId = $session.teamId;

    const members = [];

    if (teamId) {
      const team = $teams.find(team => team.id === teamId).members;

      let place = $session.count;
      let count = $session.count * $timers.session.value;

      while (count < $timers.session.value * $timers.breakAfter.value) {
        if (!$session.skipped.includes(team[place % team.length].id)) {
          members.push(team[place % team.length]);

          count += $timers.session.value;
        }

        place += 1;
      }
    }

    return members;
  },
  []
);
