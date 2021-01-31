import React, { useContext, useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

const AppContext = React.createContext();

const API_KEY = `19115D982DBF9D2E9DFD15CE88B443BD`;
const API_URI = `https://api.opendota.com/api/`;
const CDN_URI = `http://cdn.dota2.com`;

// { heroes, heroAbilities, heroLore, abilities, items, itemIds }
const resources = [
  {
    url: `${API_URI}heroStats/?api_key=${API_KEY}`,
    key: "heroes",
  },
  {
    url: `${API_URI}constants/hero_abilities/?api_key=${API_KEY}`,
    key: "heroAbilities",
  },
  {
    url: `${API_URI}constants/hero_lore/?api_key=${API_KEY}`,
    key: "heroLore",
  },
  {
    url: `${API_URI}constants/abilities/?api_key=${API_KEY}`,
    key: "abilities",
  },
  {
    url: `${API_URI}constants/items/?api_key=${API_KEY}`,
    key: "items",
  },
  {
    url: `${API_URI}constants/item_ids/?api_key=${API_KEY}`,
    key: "itemIds",
  },
];

export const AppProvider = ({ children }) => {
  const [term, setTerm] = useState("");
  const [loading, data] = useFetch(resources);

  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const type = (val) => {
    setTerm(val);
  };

  //   useEffect(() => {
  //     const fetchHeroes = async () => {
  //       setLoading(true);
  //       try {
  //         console.log("Fetching constant data...");
  //         const response = await fetch(
  //           `${API_URI}/heroStats/?api_key=${API_KEY}`
  //         );
  //         const data = await response.json();

  //         setHeroes(data);
  //         setFilteredHeroes(data);
  //         setLoading(false);
  //       } catch (e) {
  //         console.log(e);
  //         setLoading(false);
  //       }
  //     };

  //     fetchHeroes();
  //   }, []);

  useEffect(() => {
    // console.log("useeffect inside context ran");
    if (data) {
      setFilteredHeroes(data.heroes);
    }
  }, [data]);
  // console.log(filteredHeroes);

  return (
    <AppContext.Provider
      value={{
        CDN_URI,
        API_URI,
        API_KEY,
        term,
        loading,
        heroes: data && data.heroes,
        heroesAbilities: data && data.heroAbilities,
        heroLore: data && data.heroLore,
        abilities: data && data.abilities,
        items: data && data.items,
        itemIds: data && data.itemIds,
        filteredHeroes,
        type,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
