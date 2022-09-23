import React, { useEffect, useReducer } from 'react';
import propTypes from 'prop-types';
import PlanetsContext from '../context';
import reducer from '../reducer';
import { SET_FILTER, SET_RESULTS } from '../constants';

function PlanetsProvider({ children }) {
  const initialState = {
    appliedFilters: [],
    comparison: 'maior que',
    column: 'population',
    input: '',
    isSorted: false,
    planets: [],
    sortColumn: 'population',
    sortOrder: '',
    value: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchResults() {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();

      dispatch({ type: SET_RESULTS, payload: results });
    }

    fetchResults();
  }, []);

  function handleClick() {
    const { column, comparison, value } = state;
    const appliedFilter = { column, comparison, value };

    dispatch({ type: SET_FILTER, payload: appliedFilter });
  }

  function genericFilter(planet, column) {
    const filter = state.appliedFilters
      .find((appliedFilter) => appliedFilter.column === column);

    if (filter) {
      switch (filter.comparison) {
      case 'maior que':
        return Number(planet[column]) > Number(filter.value);
      case 'menor que':
        return Number(planet[column]) < Number(filter.value);
      case 'igual a':
        return Number(planet[column]) === Number(filter.value);
      default:
      }
    }

    return true;
  }

  function nameFilter({ name }) {
    return name.toLowerCase().includes(state.input);
  }

  const filtered = state.planets
    .filter((planet) => genericFilter(planet, 'population'))
    .filter((planet) => genericFilter(planet, 'orbital_period'))
    .filter((planet) => genericFilter(planet, 'diameter'))
    .filter((planet) => genericFilter(planet, 'rotation_period'))
    .filter((planet) => genericFilter(planet, 'surface_water'))
    .filter(nameFilter)
    .sort((a, b) => {
      if (!state.isSorted) return 0;

      if (state.sortOrder === 'ASC') {
        const aValue = a[state.sortColumn] === 'unknown'
          ? Infinity : Number(a[state.sortColumn]);
        const bValue = b[state.sortColumn] === 'unknown'
          ? Infinity : Number(b[state.sortColumn]);

        return aValue - bValue;
      }

      const aValue = a[state.sortColumn] === 'unknown'
        ? -Infinity : Number(a[state.sortColumn]);
      const bValue = b[state.sortColumn] === 'unknown'
        ? -Infinity : Number(b[state.sortColumn]);

      return bValue - aValue;
    });

  return (
    <PlanetsContext.Provider value={ { dispatch, filtered, handleClick, state } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default PlanetsProvider;
