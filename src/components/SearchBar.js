import React from "react";

import { useGlobalContext } from "../context";

const SearchBar = () => {
  const { term, type } = useGlobalContext();

  return (
    <>
      <form className='search__form' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='search' className='search__label'>
          Search for hero
        </label>
        <input
          type='text'
          name='search'
          id='search'
          className='search__input'
          value={term}
          placeholder="Type hero name to search..."
          onChange={(e) => type(e.target.value)}
        />
      </form>
    </>
  );
};

export default SearchBar;
