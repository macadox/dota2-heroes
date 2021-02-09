import React, { useState } from "react";
import HeroesList from "../components/HeroesList";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import FilterListbox from "../components/FilterListbox";
import SortListbox from "../components/SortListbox";
import { useGlobalContext } from "../context";

const Home = () => {
  const {
    loading,
    handleSort,
    handleAttributeFilter,
    handleRangeFilter,
    handleRoleFilter,
    toggleReverse,
    reverse,
    sort,
    attributeFilter,
    rangeFilter,
    roleFilter,
    showFilters,
    toggleFilters,
  } = useGlobalContext();

  return (
    <div className='page-wrap'>
      <h1 className='app-title'>Dota 2 - Hero Stats</h1>
      <section className='filters-main'>
        <div className='filters-wrap'>
          <h4>Filter heroes</h4>
          <div className='search'>
            <SearchBar />
          </div>
          <div className='filters'>
            <div className='filters__sort'>
              <h5>Sort data</h5>
              <SortListbox
                defaultText='Sort by'
                options={[
                  { label: "Name", value: "localized_name" },
                  { label: "ID", value: "id" },
                  { label: "Attack range", value: "attack_range" },
                  { label: "Move speed", value: "move_speed" },
                  { label: "Attack rate", value: "attack_rate" },
                  { label: "Turn rate", value: "turn_rate" },
                ]}
                callback={handleSort}
                toggleReverse={toggleReverse}
                reverse={reverse}
                defaultSort={sort}
              />
            </div>
            <div
              className={`filters__inner ${
                !showFilters ? "filters__inner--hidden" : ""
              }`}
            >
              <h5>Filter data</h5>
              <div className='filters__inner-center'>
                <FilterListbox
                  defaultText='Attributes'
                  options={[
                    { label: "Agility", value: "agi" },
                    { label: "Strength", value: "str" },
                    { label: "Intelligence", value: "int" },
                  ]}
                  callback={handleAttributeFilter}
                  defaultFilter={attributeFilter}
                />
                <FilterListbox
                  defaultText='Range'
                  options={[
                    { label: "Melee", value: "Melee" },
                    { label: "Ranged", value: "Ranged" },
                  ]}
                  callback={handleRangeFilter}
                  defaultFilter={rangeFilter}
                />
                <FilterListbox
                  defaultText='Roles'
                  options={[
                    { label: "Carry", value: "Carry" },
                    { label: "Disabler", value: "Disabler" },
                    { label: "Durable", value: "Durable" },
                    { label: "Escape", value: "Escape" },
                    { label: "Initiator", value: "Initiator" },
                    { label: "Jungler", value: "Jungler" },
                    { label: "Nuker", value: "Nuker" },
                    { label: "Pusher", value: "Pusher" },
                    { label: "Support", value: "Support" },
                  ]}
                  callback={handleRoleFilter}
                  defaultFilter={roleFilter}
                />
              </div>
            </div>
          </div>
          <button
            onClick={toggleFilters}
            className='btn--alt filters__advanced'
          >
            {showFilters ? "hide filters" : "show filters"}
          </button>
        </div>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <section className='section section--heroes'>
          <HeroesList />
        </section>
      )}
    </div>
  );
};

export default Home;
