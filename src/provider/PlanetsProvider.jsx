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
    planets: [],
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

  function populationFilter({ population }) {
    const filter = state.appliedFilters
      .find((appliedFilter) => appliedFilter.column === 'population');

    if (filter) {
      switch (filter.comparison) {
      case 'maior que':
        return Number(population) > Number(filter.value);
      case 'menor que':
        return Number(population) < Number(filter.value);
      case 'igual a':
        return Number(population) === Number(filter.value);
      default:
      }
    }

    return true;
  }

  function orbitalPeriodFilter({ orbital_period: orbitalPeriod }) {
    const filter = state.appliedFilters
      .find((appliedFilter) => appliedFilter.column === 'orbital_period');

    if (filter) {
      switch (filter.comparison) {
      case 'maior que':
        return Number(orbitalPeriod) > Number(filter.value);
      case 'menor que':
        return Number(orbitalPeriod) < Number(filter.value);
      case 'igual a':
        return Number(orbitalPeriod) === Number(filter.value);
      default:
      }
    }

    return true;
  }

  function diameterFilter({ diameter }) {
    const filter = state.appliedFilters
      .find((appliedFilter) => appliedFilter.column === 'diameter');

    if (filter) {
      switch (filter.comparison) {
      case 'maior que':
        return Number(diameter) > Number(filter.value);
      case 'menor que':
        return Number(diameter) < Number(filter.value);
      case 'igual a':
        return Number(diameter) === Number(filter.value);
      default:
      }
    }

    return true;
  }

  function rotationPeriodFilter({ rotation_period: rotationPeriod }) {
    const filter = state.appliedFilters
      .find((appliedFilter) => appliedFilter.column === 'rotation_period');

    if (filter) {
      switch (filter.comparison) {
      case 'maior que':
        return Number(rotationPeriod) > Number(filter.value);
      case 'menor que':
        return Number(rotationPeriod) < Number(filter.value);
      case 'igual a':
        return Number(rotationPeriod) === Number(filter.value);
      default:
      }
    }

    return true;
  }

  function surfaceWaterFilter({ surface_water: surfaceWater }) {
    const filter = state.appliedFilters
      .find((appliedFilter) => appliedFilter.column === 'surface_water');

    if (filter) {
      switch (filter.comparison) {
      case 'maior que':
        return Number(surfaceWater) > Number(filter.value);
      case 'menor que':
        return Number(surfaceWater) < Number(filter.value);
      case 'igual a':
        return Number(surfaceWater) === Number(filter.value);
      default:
      }
    }

    return true;
  }

  function nameFilter({ name }) {
    return name.toLowerCase().includes(state.input);
  }

  const filtered = state.planets
    .filter(populationFilter)
    .filter(orbitalPeriodFilter)
    .filter(diameterFilter)
    .filter(rotationPeriodFilter)
    .filter(surfaceWaterFilter)
    .filter(nameFilter);

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
