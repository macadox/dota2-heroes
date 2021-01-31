import React from "react";

const HeroPresenceTable = ({laneRoles}) => {
  const lanesByRoles = [];
  let totalGames = 0;

  laneRoles.forEach((role) => {
    const { lane_role, games, wins, time } = role;
    if (!Array.isArray(lanesByRoles[lane_role - 1])) {
      lanesByRoles[lane_role - 1] = [];
    }
    lanesByRoles[lane_role - 1].push({ lane_role, games, wins, time });
  });

  const finalRoles = lanesByRoles.map((arr) => {
    const totals = arr.reduce((reducer, item) => {
      const { lane_role, games, wins } = item;
      // If key does not exist
      totalGames += parseInt(games);
      if (!reducer.lane_role) {
        return {
          lane_role,
          games: parseInt(games),
          wins: parseInt(wins),
          time: Infinity,
        };
      }
      return {
        ...reducer,
        games: parseInt(reducer.games) + parseInt(games),
        wins: parseInt(reducer.wins) + parseInt(wins),
      };
    }, {});
    return [...arr, totals];
  });

  return (
    <table>
      <tbody>
        <tr>
          <th>Role</th>
          <th>15 min</th>
          <th>30 min</th>
          <th>45 min</th>
          <th>60 min</th>
          <th>90 min</th>
          <th>Total</th>
          <th>Games</th>
        </tr>
        {finalRoles.map((role, index) => {
          const { lane_role } = role[0];
          const games = role[5].games;

          if (games / totalGames < 0.04) {
            return;
          }

          return (
            <tr key={index}>
              <th>
                {lane_role === 1
                  ? "Safe Lane"
                  : lane_role === 2
                  ? "Mid Lane"
                  : lane_role === 3
                  ? "Off Lane"
                  : "Jungle"}
              </th>
              {role.map((arr, i) => {
                const winrate = parseInt(arr.wins) / parseInt(arr.games);
                return <td key={i}>{(winrate * 100).toFixed(2)}</td>;
              })}
              <td>{games}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default HeroPresenceTable;
