import React, { useState, useEffect } from "react";

const SearchBar = ({ filterByName }) => {
  const [term, setTerm] = useState("");

  const type = (value) => {
    setTerm(value);
  };

  useEffect(() => {
    filterByName(term);
  }, [term, filterByName]);

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
          placeholder='Type hero name to search...'
          onChange={(e) => type(e.target.value)}
        />
      </form>
    </>
  );
};

export default SearchBar;
