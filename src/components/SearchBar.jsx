import React, { useContext } from 'react';
import PlanetsContext from '../context';

function SearchBar() {
  const { input, handleChange } = useContext(PlanetsContext);

  return (
    <input
      data-testid="name-filter"
      onChange={ handleChange }
      type="text"
      value={ input }
    />
  );
}

export default SearchBar;
