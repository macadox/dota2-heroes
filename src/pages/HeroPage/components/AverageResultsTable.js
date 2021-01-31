import React from "react";

const AverageResultsTable = ({ benchmark }) => {
  const keys = [
    "kills_per_min",
    "last_hits_per_min",
    "gold_per_min",
    "xp_per_min",
    "hero_damage_per_min",
    "hero_healing_per_min",
    "tower_damage",
  ];
  const topPlayers = [90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 1].reverse();
  console.log(benchmark);
  return (
    <table>
      <tbody>
        <tr>
          <th>TOP</th>
          <th>KPM</th>
          <th>LHPM</th>
          <th>GPM</th>
          <th>XPM</th>
          <th>DMG</th>
          <th>HEAL</th>
          <th>Tower DMG</th>
        </tr>
        {topPlayers.map((perc, index) => {
          return (
            <tr key={index}>
              <th>{perc}%</th>
              {keys.map((key, i) => {
                const val = benchmark[key][index].value;

                return <td key={i}>{Math.round(val * 100) / 100}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AverageResultsTable;
