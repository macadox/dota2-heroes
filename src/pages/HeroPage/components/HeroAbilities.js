import React from "react";
import Ability from "./Ability";

const HeroAbilities = ({ heroAbilities, abilities }) => {
  const mappedAbilities = heroAbilities.abilities.map((a) => {
    return abilities[a];
  });

  return (
    <div className='hero__abilities'>
      {mappedAbilities.map((ability) => {
        if (!ability.dname) return null;
        return <Ability ability={ability} key={ability.dname} />;
      })}
    </div>
  );
};

export default HeroAbilities;
