import React, { useContext } from 'react';
import PlanetsContext from '../context';
import { SET_INPUT } from '../constants';

function SearchBar() {
  const { dispatch, state: { input } } = useContext(PlanetsContext);

  return (
    <input
      data-testid="name-filter"
      onChange={ ({ target: { value } }) => (
        dispatch({ type: SET_INPUT, payload: value })) }
      type="text"
      value={ input }
    />
  );
}

export default SearchBar;
