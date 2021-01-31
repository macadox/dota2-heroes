import React from "react";
import Hero from "./Hero";

import { useGlobalContext } from "../context";

const HeroesList = () => {
    const { filteredHeroes } = useGlobalContext();
  const slugRegex = new RegExp(/(?<=npc_dota_hero_)\w+/, "");

  return (
    <ul className='hero-list'>
      {filteredHeroes.map((h) => {
        const { id, localized_name, primary_attr, img } = h;

        return (
          <Hero key={id} hero={{ localized_name, primary_attr, img, id }} />
        );
      })}
    </ul>
  );
};

export default HeroesList;
