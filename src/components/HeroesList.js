import React from "react";
import Hero from "./Hero";

import { useGlobalContext } from "../context";

const HeroesList = () => {
  const {
    heroes,
    sort,
    reverse,
    attributeFilter,
    rangeFilter,
    roleFilter,
    term,
  } = useGlobalContext();

  const sortList = (heroes) => {
    const sortedHeroes = heroes.sort((a, b) => {
      if (!reverse) {
        if (b[sort] < a[sort]) return 1;
        else return -1;
      } else {
        if (b[sort] < a[sort]) return -1;
        else return 1;
      }
    });

    return sortedHeroes;
  };
  const filterList = (heroes, filters) => {
    const regex = new RegExp(term, "gi");
    const newHeroes = heroes.filter((hero) => {
      return (
        !filters
          .map(({ key, val }) => {
            if (Array.isArray(hero[key])) {
              return val.every((r) => hero[key].includes(r));
            }
            if (val.includes(hero[key])) return true;
            else return false;
          })
          .includes(false) &&
        (regex.test(hero.localized_name) || regex.test(hero.name))
      );
    });
    return newHeroes;
  };

  const prepareList = () => {
    return sortList(
      filterList(heroes, [
        { key: "primary_attr", val: attributeFilter },
        { key: "attack_type", val: rangeFilter },
        { key: "roles", val: roleFilter },
      ])
    );
  };

  return (
    <ul className='hero-list'>
      {prepareList().length === 0 ? (
        <span className='hero-list__error'>
          There are no heroes matching that criteria...
        </span>
      ) : (
        prepareList().map((h) => {
          const { id, localized_name, primary_attr, img } = h;

          return (
            <Hero key={id} hero={{ localized_name, primary_attr, img, id }} />
          );
        })
      )}
    </ul>
  );
};

export default HeroesList;
