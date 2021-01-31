import React from "react";
import { useGlobalContext } from "../../../context";

// TODO: Add tooltips on abilities.

const HeroAbilities = ({ heroAbilities, abilities }) => {
  const { CDN_URI } = useGlobalContext();
  console.log(heroAbilities.abilities);
  const mappedAbilities = heroAbilities.abilities.map((a) => {
    return abilities[a];
  });
  // console.log(mappedAbilities);

  return (
    <div className='hero__abilities'>
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
    </div>
  );
};

export default HeroAbilities;
