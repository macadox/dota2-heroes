import "./Home.css";
import React from "react";
import HeroesList from "./components/HeroesList";
import HeroFilterPanel from "./components/HeroFilterPanel";
import Loading from "../common/Loading";

import { useGlobalContext } from "../../contexts/GlobalContext";
import Footer from "../common/Footer";
const Home = () => {
  const { loading } = useGlobalContext();

  return (
    <>
      <div className='page-wrap'>
        <h1 className='app-title'>Dota 2 - Hero Stats</h1>
        <section className='filters-main'>
          <HeroFilterPanel />
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
