import React, { useContext } from 'react';
import { REMOVE_FILTER, REMOVE_FILTERS } from '../constants';
import PlanetsContext from '../context';

function Buttons() {
  const { dispatch, state: { appliedFilters } } = useContext(PlanetsContext);

  return (
    <section>
      <button
        data-testid="button-remove-filters"
        onClick={ () => dispatch({ type: REMOVE_FILTERS }) }
        type="button"
      >
        Remover filtros
      </button>
      {appliedFilters.map(({ column, comparison, value }) => (
        <p data-testid="filter" key={ column }>
          {`${column} ${comparison} ${value}`}
          <button
            onClick={ () => dispatch({ type: REMOVE_FILTER, payload: column }) }
            type="button"
          >
            X
          </button>
        </p>
      ))}
    </section>
  );
}

export default Buttons;
