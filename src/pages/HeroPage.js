import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaAsterisk,
  FaKhanda,
  FaShieldAlt,
  FaRunning,
  FaHandPaper,
  FaMagic,
  FaSyncAlt,
  FaSlidersH,
  FaLongArrowAltRight,
} from "react-icons/fa";

import { useFetch } from "../hooks/useFetch";
import { useGlobalContext } from "../context";

import Loading from "../components/Loading";

import agiIcon from "../assets/img/agi-big.jpg";
import intIcon from "../assets/img/int-big.jpg";
import strIcon from "../assets/img/str-big.jpg";
import agiMin from "../assets/img/agi-min.jpg";
import intMin from "../assets/img/int-min.jpg";
import strMin from "../assets/img/str-min.jpg";

const imgSuffixes = {
  small: `sb.png`,
  large: `lg.png`,
  full: `full.png`,
  vertical: `vert.png`,
};

// heroes: data && data.heroes,
// heroesAbilities: data && data.heroesAbilities,
// heroLore: data && data.heroLore,
// abilities: data && data.abilities,
// items: data && data.items,
// itemIds: data && data.itemIds,

// const slug = name.match(slugRegex)[0];

const HeroPage = () => {
  const { id } = useParams();
  const {
    loading,
    heroes,
    heroesAbilities,
    heroLore,
    abilities,
    items,
    itemIds,
    benchmarks,
    API_URI,
    API_KEY,
    CDN_URI,
  } = useGlobalContext();
  const [heroLoading, data] = useFetch(
    [
      {
        url: `${API_URI}heroes/${id}/itemPopularity/?api_key=${API_KEY}`,
        key: "itemPopularity",
      },
      {
        url: `${API_URI}heroes/${id}/matchups/?api_key=${API_KEY}`,
        key: "matchups",
      },
      {
        url: `${API_URI}benchmarks?hero_id=${id}&api_key=${API_KEY}`,
        key: "benchmarks",
      },
      {
        url: `${API_URI}scenarios/laneRoles?hero_id=${id}&api_key=${API_KEY}`,
        key: "laneRoles",
      },
    ],
    id
  );

  //   useEffect(() => {
  //     const fetchHeroData = async () => {
  //       console.log("fetching hero data..");
  //       setHeroLoading(true);
  //       try {
  //         const responsePromiseArr = resources.map((resource) => {
  //           return fetch(
  //             `${API_URI}heroes/${id}/${resource}/?api_key=${API_KEY}`
  //           );
  //         });
  //         const responseArr = await Promise.all(responsePromiseArr);
  //         const dataPromiseArr = responseArr.map((response) => response.json());
  //         const dataArr = await Promise.all(dataPromiseArr);
  //         const [items, matchups] = dataArr;

  //         setHeroMatchups(matchups);
  //         setHeroItems(items);
  //         setHeroLoading(false);
  //       } catch (e) {
  //         setHeroLoading(false);
  //         throw e;
  //       }
  //     };
  //     fetchHeroData();
  //   }, [id]);

  if (loading || heroLoading) return <Loading />;

  //   TODO ERROR COMPONENT
  if (data && data.matchups.length === 0)
    return <div>Something went wrong...</div>;
  const hero = heroes.find((h) => h.hero_id === parseInt(id));

  console.log(data.benchmarks);
  console.log(hero);
  // TODO: Add tooltips on abilities.
  const renderAbilities = (name) => {
    const heroAbilities = heroesAbilities[name];
    const mappedAbilities = heroAbilities.abilities.map((a) => {
      return abilities[a];
    });
    // console.log(mappedAbilities);

    return (
      <>
        {mappedAbilities.map((ability) => {
          if (!ability.dname) return;
          return (
            <div className='hero__ability' key={ability.dname}>
              <img
                src={`${CDN_URI}${ability.img}`}
                alt={ability.dname}
                className='hero__ability-img'
              />
              {/* Tooltip also */}
            </div>
          );
        })}
      </>
    );
  };

  const renderAverageResults = () => {
    const benchmark = data.benchmarks.result;
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
              <tr>
                <th>{perc}%</th>
                {keys.map((key) => {
                  const val = benchmark[key][index].value;

                  return <td>{Math.round(val * 100) / 100}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderHeroPresence = () => {
    const lanesByRoles = [];
    let totalGames = 0;

    data.laneRoles.forEach((role) => {
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
                    ? "Offlane"
                    : "Jungle"}
                </th>
                {role.map((arr, i) => {
                  const winrate = parseInt(arr.wins) / parseInt(arr.games);
                  return <td key={i}>{(winrate * 100).toFixed(2)}%</td>;
                })}
                <td>{games}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  // TODO: Add tooltips on items
  const renderPopularItems = () => {
    const results = {};

    Object.entries(data.itemPopularity).forEach((stage) => {
      const [key, val] = stage;
      results[key] = [];
      Object.entries(val).forEach((item) => {
        const itemName = itemIds[item[0]];
        const itemObj = {
          id: item[0],
          popularity: item[1],
          name: items[itemName].dname,
          img: items[itemName].img,
          quality: items[itemName].qual,
        };
        results[key].push(itemObj);
      });
      results[key]
        .sort((a, b) => (a.popularity < b.popularity ? 1 : -1))
        .splice(6);
    });

    const ordered = [
      results.start_game_items,
      results.early_game_items,
      results.mid_game_items,
      results.late_game_items,
    ];
    return (
      <>
        {ordered.map((stage, index) => {
          return (
            <div className='stage' key={index}>
              <h4 className='stage__label'>
                {index === 0
                  ? "Start"
                  : index === 1
                  ? "Early game"
                  : index === 2
                  ? "Mid game"
                  : "Late game"}
              </h4>
              <div className='stage__items'>
                {stage.map((item) => {
                  const { id, img, name, quality } = item;
                  return (
                    <div className={`item item--${quality}`} key={id}>
                      <img
                        src={`${CDN_URI}${img}`}
                        alt={name}
                        className='item__img'
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const totalMatchupsPlayed = data.matchups.reduce(
    (reducer, matchup) => (reducer += matchup.games_played),
    0
  );
  const sortedMatchups = data.matchups
    .filter(
      (matchup) =>
        matchup.games_played >
        Math.floor(totalMatchupsPlayed / data.matchups.length / 3)
    )
    .sort((a, b) =>
      b.wins / b.games_played > a.wins / a.games_played ? 1 : -1
    );

  console.log(sortedMatchups);

  return (
    <section className='section section--hero'>
      <Link className='btn' to='/'>
        Back
      </Link>
      <div className='hero'>
        <div className='hero__left'>
          <div className='hero__main'>
            <div className='hero__img-container'>
              <img
                src={`${CDN_URI}${hero.img}`}
                alt={hero.localized_name}
                className='hero__portrait'
              />
              <img
                src={
                  hero.primary_attr === "agi"
                    ? agiIcon
                    : hero.primary_attr === "str"
                    ? strIcon
                    : intIcon
                }
                alt={hero.primary_attr}
                className='hero__attribute'
              />
            </div>
            <h2 className='hero__name'>{hero.localized_name}</h2>
            <p className='hero__roles'>
              {[hero.attack_type, ...hero.roles].map((r, i) => {
                return (
                  <React.Fragment key={i}>
                    {r}
                    {i < hero.roles.length ? (
                      <FaAsterisk className='fa-asterisk' />
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                );
              })}
            </p>
            <div className='hero__abilities'>{renderAbilities(hero.name)}</div>
            <div className='hero__stats'>
              <div className='stats stats--main'>
                <div className='stat agi'>
                  <img src={agiMin} alt='agility' />
                  <div className='stat__values'>
                    <span className='stat__value'>{hero.base_agi}</span>
                    <span className='stat__gain'>+{hero.agi_gain}</span>
                  </div>
                </div>
                <div className='stat int'>
                  <img src={intMin} alt='intelligence' />
                  <div className='stat__values'>
                    <span className='stat__value'>{hero.base_int}</span>
                    <span className='stat__gain'>+{hero.int_gain}</span>
                  </div>
                </div>
                <div className='stat str'>
                  <img src={strMin} alt='strength' />
                  <div className='stat__values'>
                    <span className='stat__value'>{hero.base_str}</span>
                    <span className='stat__gain'>+{hero.str_gain}</span>
                  </div>
                </div>
              </div>
              <div className='stats stats--sec'>
                <table>
                  <tbody>
                    <tr>
                      <th>Attack</th>
                      <td>
                        <FaKhanda />
                        <span>
                          {hero.base_attack_min} - {hero.base_attack_max}
                        </span>
                      </td>
                      <td>
                        <FaHandPaper />
                        <span>{hero.attack_rate}</span>
                      </td>
                      <td>
                        <FaSlidersH />
                        <span>{hero.attack_range}</span>
                      </td>
                      <td>
                        <FaLongArrowAltRight />
                        <span>{hero.projectile_speed}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>Defense</th>
                      <td>
                        <FaShieldAlt />
                        <span>{hero.base_armor}</span>
                      </td>
                      <td>
                        <FaMagic />
                        <span>{hero.base_mr}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>Mobility</th>
                      <td>
                        <FaRunning />
                        <span>{hero.move_speed}</span>
                      </td>
                      <td>
                        <FaSyncAlt />
                        <span>{hero.turn_rate}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='hero_lane-roles'>
            <h3>Lane presence</h3>
            <div className='hero__lane-roles-inner'>{renderHeroPresence()}</div>
          </div>
          <div className='hero__averages'>
            <h3>Average results</h3>
            <div className='hero__average-inner'>{renderAverageResults()}</div>
          </div>
        </div>
        <div className='hero__right'>
          <div className='hero__items'>
            <h3>Popular items</h3>
            <div className='hero__items-inner'>{renderPopularItems()}</div>
          </div>
          <div className='hero__matchups hero__matchups--best'>
            <h3>Best against</h3>
            <div className='matchups'></div>
            <div className='hero__matchups-inner'></div>
          </div>
          <div className='hero__matchups hero__matchups--worst'>
            <h3>Worst agains</h3>
          </div>
          <div className='hero__lore'>
            <h3>Hero lore</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
