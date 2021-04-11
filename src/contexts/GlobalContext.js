import React, { useContext, useReducer } from "react";
import { useFetch } from "../hooks/useFetch";

export const AppContext = React.createContext();

const API_KEY = `19115D982DBF9D2E9DFD15CE88B443BD`;
const API_URI = `https://api.opendota.com/api/`;
const CDN_URI = `https://cdn.dota2.com`;

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

const initialState = {
  nameFilter: "",
  attributeFilter: ["agi", "str", "int"],
  rangeFilter: ["Melee", "Ranged"],
  roleFilter: [],
  sort: "localized_name",
  reverse: false,
  showFilters: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FILTER_BY_NAME": {
      return { ...state, nameFilter: action.payload };
    }
    case "SORT_BY": {
      return { ...state, sort: action.payload };
    }
    case "FILTER_BY_ATTRIBUTE": {
      return { ...state, attributeFilter: action.payload };
    }
    case "FILTER_BY_RANGE": {
      return { ...state, rangeFilter: action.payload };
    }
    case "FILTER_BY_ROLE": {
      return { ...state, roleFilter: action.payload };
    }
    case "SORT_REVERSE": {
      return { ...state, reverse: action.payload };
    }
    case "FILTER_TOGGLE": {
      return { ...state, showFilters: !state.showFilters };
    }
    case "FILTER_RESET": {
      return {
        ...state,
        attributeFilter: ["agi", "str", "int"],
        rangeFilter: ["Melee", "Ranged"],
        roleFilter: [],
        nameFilter: "",
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const AppProvider = ({ children }) => {
  // const [nameFilter, setNameFilter] = useState("");
  // const [attributeFilter, setAttributeFilter] = useState(["agi", "str", "int"]);
  // const [rangeFilter, setRangeFilter] = useState(["Melee", "Ranged"]);
  // const [roleFilter, setRoleFilter] = useState([]);
  // const [sort, setSort] = useState("localized_name");
  // const [reverse, setReverse] = useState(false);
  // const [showFilters, setShowFilters] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, data] = useFetch(resources);

  const filterByName = (value) => {
    // setNameFilter(value);
    dispatch({ type: "FILTER_BY_NAME", payload: value });
  };

  const handleSort = (value) => {
    // setSort(value);
    dispatch({ type: "SORT_BY", payload: value });
  };

  const handleAttributeFilter = (values) => {
    // setAttributeFilter(values);
    dispatch({ type: "FILTER_BY_ATTRIBUTE", payload: values });
  };

  const handleRangeFilter = (values) => {
    // setRangeFilter(values);
    dispatch({ type: "FILTER_BY_RANGE", payload: values });
  };

  const handleRoleFilter = (values) => {
    // setRoleFilter(values);
    dispatch({ type: "FILTER_BY_ROLE", payload: values });
  };

  const handleReverse = (bool) => {
    // setReverse(bool);
    dispatch({ type: "SORT_REVERSE", payload: bool });
  };

  const toggleFilters = () => {
    // setShowFilters(!showFilters);
    dispatch({ type: "FILTER_TOGGLE" });
  };

  const resetFilters = () => {
    // setAttributeFilter(["agi", "str", "int"]);
    // setRangeFilter(["Melee", "Ranged"]);
    // setRoleFilter([]);
    // setNameFilter("");
    dispatch({ type: "FILTER_RESET" });
  };

  return (
    <AppContext.Provider
      value={{
        CDN_URI,
        API_URI,
        API_KEY,
        term: state.nameFilter,
        loading,
        sort: state.sort,
        reverse: state.reverse,
        attributeFilter: state.attributeFilter,
        rangeFilter: state.rangeFilter,
        roleFilter: state.roleFilter,
        heroes: data && data.heroes,
        heroesAbilities: data && data.heroAbilities,
        heroLore: data && data.heroLore,
        abilities: data && data.abilities,
        items: data && data.items,
        itemIds: data && data.itemIds,
        filterByName,
        handleSort,
        handleAttributeFilter,
        handleRangeFilter,
        handleRoleFilter,
        handleReverse,
        resetFilters,
        showFilters: state.showFilters,
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
