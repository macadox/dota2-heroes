import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useGlobalContext } from "../../context";

import Loading from "../../components/Loading";
// Page Components
import HeroHeader from "./components/HeroHeader";
import HeroStats from "./components/HeroStats";
import HeroAbilities from "./components/HeroAbilities";
import HeroPresenceTable from "./components/HeroPresenceTable";
import AverageResultsTable from "./components/AverageResultsTable";
import PopularItemsList from "./components/PopularItemsList";
import HeroMatchups from "./components/HeroMatchups";
import HeroLore from "./components/HeroLore";

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
    API_URI,
    API_KEY,
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

  if (loading || heroLoading) return <Loading />;

  //   TODO ERROR COMPONENT
  if (data && data.matchups.length === 0)
    return <div>Something went wrong...</div>;
  const hero = heroes.find((h) => h.hero_id === parseInt(id));

  console.log(data.benchmarks);
  console.log(hero);

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

  const mappedMatchups = sortedMatchups
    .slice(0, 8)
    .concat(sortedMatchups.slice(-8))
    .map((matchup) => {
      const { hero_id } = matchup;
      const {
        localized_name,
        primary_attr,
        attack_type,
        img,
        roles,
      } = heroes.find((h) => h.id === hero_id);
      return {
        ...matchup,
        localized_name,
        primary_attr,
        attack_type,
        img,
        roles,
      };
    });

  return (
    <section className='section section--hero'>
      <Link className='btn' to='/'>
        Back
      </Link>
      <div className='hero'>
        <article className='hero__main'>
          <HeroHeader hero={hero} />
          <HeroAbilities
            heroAbilities={heroesAbilities[hero.name]}
            abilities={abilities}
          />
          <h3>Hero Stats</h3>
          <HeroStats hero={hero} />
        </article>
        <article className='hero__lane-roles'>
          <h3>Lane presence</h3>
          <HeroPresenceTable laneRoles={data.laneRoles} />
        </article>
        <article className='hero__averages'>
          <h3>Average results</h3>
          <AverageResultsTable benchmark={data.benchmarks.result} />
        </article>
        <article className='hero__items'>
          <h3>Popular items</h3>
          <PopularItemsList
            itemPopularity={data.itemPopularity}
            items={items}
            itemIds={itemIds}
          />
        </article>
        <article className='hero__matchups hero__matchups--best'>
          <h3>Best against</h3>
          <HeroMatchups matchupList={mappedMatchups.slice(0, 8)} />
        </article>
        <article className='hero__matchups hero__matchups--worst'>
          <h3>Worst against</h3>
          <HeroMatchups matchupList={mappedMatchups.slice(-8).reverse()} />
        </article>
        <article className='hero__lore'>
          <h3>Hero lore</h3>
          <HeroLore heroLore={heroLore} hero={hero} />
        </article>
      </div>
    </section>
  );
};

export default HeroPage;
