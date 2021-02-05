import React, { useState } from "react";
import HeroesList from "../components/HeroesList";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import MultiListbox from "../components/MultiListbox";
import SingleListbox from "../components/SingleListbox";
import { useGlobalContext } from "../context";

const Home = () => {
  const { loading, handleSort, handleFilter } = useGlobalContext();
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <>
      <h1 className='app-title'>Dota 2 - Hero info</h1>
      <div className='filters-wrap'>
        <h4>Filter heroes</h4>
        <div className='search'>
          <SearchBar />
        </div>
        <div className='filters'>
          <div className='filters__sort'>
            <h5>Sort data</h5>
            <SingleListbox
              defaultText='Sort by'
              options={[
                { label: "ID", value: "id" },
                { label: "Move speed", value: "move_speed" },
                { label: "Name", value: "localized_name" },
              ]}
              callback={handleSort}
            />
          </div>
          {showAdvanced && (
            <div className='filters__inner'>
              <h5>Filter data</h5>
              <div className='filters__inner-center'>
                <MultiListbox
                  defaultText='Attribute'
                  options={[
                    { label: "Agility", value: "agi" },
                    { label: "Strength", value: "str" },
                    { label: "Intelligence", value: "int" },
                  ]}
                  callback={handleFilter}
                />
                <MultiListbox
                  defaultText='Range'
                  options={[
                    { label: "Melee", value: "melee" },
                    { label: "Ranged", value: "ranged" },
                  ]}
                  callback={handleFilter}
                />
                <MultiListbox
                  defaultText='Range'
                  options={[
                    { label: "Melee", value: "melee" },
                    { label: "Ranged", value: "ranged" },
                  ]}
                  callback={handleFilter}
                />
                <MultiListbox
                  defaultText='Range'
                  options={[
                    { label: "Melee", value: "melee" },
                    { label: "Ranged", value: "ranged" },
                  ]}
                  callback={handleFilter}
                />
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className='btn--alt filters__advanced'
        >
          {showAdvanced ? "hide advanced" : "show advanced"}
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <section className='section section--heroes'>
          <HeroesList />
        </section>
      )}
    </>
  );
};

export default Home;
