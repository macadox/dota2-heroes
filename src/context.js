import React, { useContext, useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

const AppContext = React.createContext();

const API_KEY = `19115D982DBF9D2E9DFD15CE88B443BD`;
const API_URI = `https://api.opendota.com/api/`;
const CDN_URI = `http://cdn.dota2.com`;

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
  const [attributeFilter, setAttributeFilter] = useState(["agi", "str", "int"]);
  const [rangeFilter, setRangeFilter] = useState(["Melee", "Ranged"]);
  const [roleFilter, setRoleFilter] = useState([]);
  const [sort, setSort] = useState("localized_name");
  const [reverse, setReverse] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, data] = useFetch(resources);

  const type = (val) => {
    setTerm(val);
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleAttributeFilter = (values) => {
    setAttributeFilter(values);
  };

  const handleRangeFilter = (values) => {
    setRangeFilter(values);
  };

  const handleRoleFilter = (values) => {
    setRoleFilter(values);
  };

  const toggleReverse = (target) => {
    if (target.getAttribute("aria-selected") === "true") {
      setReverse(!reverse);
    } else {
      setReverse(false);
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <AppContext.Provider
      value={{
        CDN_URI,
        API_URI,
        API_KEY,
        term,
        loading,
        sort,
        reverse,
        attributeFilter,
        rangeFilter,
        roleFilter,
        heroes: data && data.heroes,
        heroesAbilities: data && data.heroAbilities,
        heroLore: data && data.heroLore,
        abilities: data && data.abilities,
        items: data && data.items,
        itemIds: data && data.itemIds,
        type,
        handleSort,
        handleAttributeFilter,
        handleRangeFilter,
        handleRoleFilter,
        toggleReverse,
        showFilters,
        toggleFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
