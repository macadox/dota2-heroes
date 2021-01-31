import React from "react";

import { useGlobalContext } from "../../../context";

const HeroMatchups = ({ matchupList = [] }) => {
  const { CDN_URI } = useGlobalContext();

  return (
    <div className='matchups'>
      {matchupList.map((hero) => {
        return (
          <div className='matchup__hero' key={hero.hero_id}>
            <img
              src={`${CDN_URI}${hero.img}`}
              alt={hero.localized_name}
              className='matchup__img'
            />
          </div>
        );
      })}
    </div>
  );
};

export default HeroMatchups;