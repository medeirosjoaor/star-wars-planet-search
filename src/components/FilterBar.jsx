import React, { useContext } from 'react';
import { columnOptions, comparisonOptions } from '../helper';
import {
  SET_COLUMN,
  SET_COMPARISON,
  SET_ORDER,
  SET_SORT_COLUMN,
  SET_VALUE,
  SET_SORT,
} from '../constants';
import PlanetsContext from '../context';

function FilterBar() {
  const {
    dispatch,
    handleClick,
    state: { appliedFilters, column, comparison, sortColumn, value },
  } = useContext(PlanetsContext);

  const columns = [];

  appliedFilters.forEach((appliedFilter) => columns.push(appliedFilter.column));

  return (
    <>
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
      <section>
        <select
          data-testid="column-sort"
          onChange={ ({ target }) => (
            dispatch({ type: SET_SORT_COLUMN, payload: target.value })) }
          value={ sortColumn }
        >
          {columnOptions.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>
        <input
          data-testid="column-sort-input-asc"
          name="sort-order"
          onClick={ () => dispatch({ type: SET_ORDER, payload: 'ASC' }) }
          type="radio"
          value="ASC"
        />
        <input
          data-testid="column-sort-input-desc"
          name="sort-order"
          onClick={ () => dispatch({ type: SET_ORDER, payload: 'DESC' }) }
          type="radio"
          value="DESC"
        />
        <button
          data-testid="column-sort-button"
          onClick={ () => dispatch({ type: SET_SORT }) }
          type="button"
        >
          Ordenar
        </button>
      </section>
    </>
  );
}

export default FilterBar;
