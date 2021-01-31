import React from "react";
import HeroesList from "../components/HeroesList";

const Home = () => {
  return (
    <>
      <h1 className='app-title'>Dota 2 - Hero info</h1>
      <div className='filters'>This will be hero filters</div>
      <section className='section section--heroes'>
        <HeroesList />
      </section>
    </>
  );
};

export default Home;
