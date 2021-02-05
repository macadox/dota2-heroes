import React from "react";
import Hero from "./Hero";

import { useGlobalContext } from "../context";

const HeroesList = () => {
  const { heroes, sort, asc } = useGlobalContext();

  const sortList = () => {
    const sortedHeroes = heroes.sort((a, b) => {
      if (asc) {
        if (b[sort] < a[sort]) return 1;
        else return -1;
      } else {
        if (b[sort] < a[sort]) return -1;
        else return 1;
      }
    });

    return sortedHeroes;
  };

  const filterList = () => {};

  return (
    <ul className='hero-list'>
      {sortList(heroes).map((h) => {
        const { id, localized_name, primary_attr, img } = h;

        return (
          <Hero key={id} hero={{ localized_name, primary_attr, img, id }} />
        );
      })}
    </ul>
  );
};

export default HeroesList;
