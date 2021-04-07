import "./Home.css";
import React from "react";
import HeroesList from "./components/HeroesList";
import Loading from "../common/Loading";
import SearchBar from "../common/SearchBar";
import FilterListbox from "../common/FilterListbox";
import SortListbox from "../common/SortListbox";
import { useGlobalContext } from "../../contexts/GlobalContext";
import Footer from "../common/Footer";
const Home = () => {
  const {
    loading,
    handleSort,
    handleAttributeFilter,
    handleRangeFilter,
    handleRoleFilter,
    filterByName,
    handleReverse,
    reverse,
    sort,
    attributeFilter,
    rangeFilter,
    roleFilter,
    showFilters,
    toggleFilters,
  } = useGlobalContext();

  return (
    <>
      <div className='page-wrap'>
        <h1 className='app-title'>Dota 2 - Hero Stats</h1>
        <section className='filters-main'>
          <div className='filters-wrap'>
            <h2>Filter heroes</h2>
            <div className='search'>
              <SearchBar filterByName={filterByName} />
            </div>
            <div className='filters'>
              <div className='filters__sort'>
                <h3>Sort data</h3>
                <SortListbox
                  options={[
                    { label: "Name", value: "localized_name" },
                    { label: "ID", value: "id" },
                    { label: "Attack range", value: "attack_range" },
                    { label: "Move speed", value: "move_speed" },
                    { label: "Attack rate", value: "attack_rate" },
                    { label: "Turn rate", value: "turn_rate" },
                  ]}
                  sortBy={handleSort}
                  handleReverse={handleReverse}
                  reverse={reverse}
                  defaultSort={sort}
                />
              </div>
              <button
                onClick={toggleFilters}
                className='btn--alt filters__advanced'
              >
                {showFilters ? "hide filters" : "show filters"}
              </button>
              <div
                className={`filters__inner ${
                  !showFilters ? "filters__inner--hidden" : ""
                }`}
              >
                <h3>Filter data</h3>
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
      {/* Footer included here for CLS  performance*/}
      {!loading && <Footer />}
    </>
  );
};

export default Home;
