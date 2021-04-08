import React from "react";
import Ability from "./Ability";

const HeroAbilities = ({ heroAbilities, abilities, handlePosition }) => {
  const mappedAbilities = heroAbilities.abilities.map((a) => {
    return abilities[a];
  });

  return (
    <div className='hero__abilities'>
      {mappedAbilities.map((ability) => {
        if (!ability.dname) return null;
        return (
          <Ability
            handlePosition={handlePosition}
            ability={ability}
            key={ability.dname}
          />
        );
      })}
    </div>
  );
};

export default HeroAbilities;
