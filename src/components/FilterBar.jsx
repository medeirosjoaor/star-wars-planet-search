import React, { useContext } from 'react';
import { columnOptions, comparisonOptions } from '../helper';
import { SET_COLUMN, SET_COMPARISON, SET_VALUE } from '../constants';
import PlanetsContext from '../context';

function FilterBar() {
  const {
    dispatch,
    handleClick,
    state: { appliedFilters, column, comparison, value },
  } = useContext(PlanetsContext);

  const columns = [];

  appliedFilters.forEach((appliedFilter) => columns.push(appliedFilter.column));

  return (
    <section>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => (
          dispatch({ type: SET_COLUMN, payload: target.value })) }
        value={ column }
      >
        {columnOptions.map((option) => (
          columns.includes(option)
            ? null
            : <option key={ option } value={ option }>{option}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => (
          dispatch({ type: SET_COMPARISON, payload: target.value })) }
        value={ comparison }
      >
        {comparisonOptions.map((option) => (
          <option key={ option } value={ option }>{option}</option>
        ))}
      </select>
      <input
        data-testid="value-filter"
        onChange={ ({ target }) => (
          dispatch({ type: SET_VALUE, payload: target.value })) }
        type="number"
        value={ value }
      />
      <button
        data-testid="button-filter"
        onClick={ handleClick }
        type="button"
      >
        Filtrar
      </button>
    </section>
  );
}

export default FilterBar;
