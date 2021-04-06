import React, { useState, useRef, useEffect } from "react";
import Hero from "./Hero";
import keys from "../../../utils/keys";
import { useGlobalContext } from "../../../contexts/GlobalContext";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [numColumns, setNumColumns] = useState(null);
  const [filteredHeroes, setFilteredHeroes] = useState([...heroes]);
  const gridRef = useRef(null);

  useEffect(() => {
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

    const newList = sortList(
      filterList(heroes, [
        { key: "primary_attr", val: attributeFilter },
        { key: "attack_type", val: rangeFilter },
        { key: "roles", val: roleFilter },
      ])
    );
    setFilteredHeroes(newList);
  }, [sort, attributeFilter, rangeFilter, roleFilter, reverse, term, heroes]);

  useEffect(() => {
    handleResize();
    setActiveIndex(0);
  }, [filteredHeroes]);

  const handleKeyDown = (e) => {
    let index = activeIndex;
    switch (e.keyCode) {
      case keys.left: {
        e.preventDefault();
        if (activeIndex % numColumns === 0) {
          if (activeIndex + numColumns - 1 >= filteredHeroes.length) {
            index = filteredHeroes.length - 1;
          } else {
            index = activeIndex + numColumns - 1;
          }
        } else {
          index = activeIndex - 1;
        }
        break;
      }
      case keys.up: {
        e.preventDefault();
        if (activeIndex < numColumns) {
          let heroIndex = filteredHeroes.length - 1;
          while (heroIndex % numColumns > activeIndex % numColumns) {
            heroIndex--;
          }
          index = heroIndex;
        } else {
          index = activeIndex - numColumns;
        }
        break;
      }
      case keys.right: {
        e.preventDefault();
        if (activeIndex % numColumns === numColumns - 1) {
          index = activeIndex - numColumns + 1;
        } else if (activeIndex + 1 >= filteredHeroes.length) {
          const difference = activeIndex % numColumns;
          index = activeIndex - difference;
        } else {
          index = activeIndex + 1;
        }
        break;
      }
      case keys.down: {
        e.preventDefault();
        if (activeIndex + numColumns > filteredHeroes.length - 1) {
          let heroIndex = 0;
          while (heroIndex % numColumns < activeIndex % numColumns) {
            heroIndex++;
          }
          index = heroIndex;
        } else {
          index = activeIndex + numColumns;
        }
        break;
      }
      case keys.end: {
        e.preventDefault();
        index = filteredHeroes.length - 1;
        break;
      }
      case keys.home: {
        e.preventDefault();
        index = 0;
        break;
      }
      default: {
        break;
      }
    }
    focusCard(index);
    setActiveIndex(index);
  };

  const focusCard = (idx) => {
    const cardLinks = gridRef.current.querySelectorAll(".card__url");
    cardLinks[idx].focus();
  };

  const handleResize = () => {
    const columns = window
      .getComputedStyle(gridRef.current)
      .getPropertyValue("grid-template-columns")
      .split(" ").length;

    setNumColumns(columns);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ul className='hero-list' aria-label='heroes list' ref={gridRef}>
      {filteredHeroes.length === 0 ? (
        <span className='hero-list__error'>
          There are no heroes matching that criteria...
        </span>
      ) : (
        filteredHeroes.map((h, i) => {
          const { id, localized_name, primary_attr, img } = h;
          return (
            <Hero
              key={id}
              tabIndex={i === activeIndex ? 0 : -1}
              hero={{ localized_name, primary_attr, img, id }}
              onKeyDown={handleKeyDown}
            />
          );
        })
      )}
    </ul>
  );
};

export default HeroesList;
