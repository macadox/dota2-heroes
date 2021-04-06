import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../../../contexts/GlobalContext";

const HeroMatchups = ({ matchupList = [] }) => {
  const { CDN_URI } = useGlobalContext();

  return (
    <div className='matchups'>
      {matchupList.map((hero) => {
        const winrate = +((hero.wins / hero.games_played) * 100).toFixed(2);
        return (
          <div className='matchup__hero' key={hero.hero_id}>
            <img
              src={`${CDN_URI}${hero.img}`}
              alt={hero.localized_name}
              className='matchup__img'
            />
            <div className='matchup__content'>
              <span
                className={`matchup__winrate matchup__winrate--${
                  winrate >= 50 ? "green" : "red"
                }`}
              >
                {winrate}%
              </span>
              <Link to={`/hero/${hero.hero_id}`} className='matchup__button'>
                View hero
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroMatchups;
