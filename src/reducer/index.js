import {
  REMOVE_FILTER,
  REMOVE_FILTERS,
  SET_COLUMN,
  SET_COMPARISON,
  SET_FILTER,
  SET_INPUT,
  SET_RESULTS,
  SET_VALUE,
} from '../constants';

function reducer(state, { payload, type }) {
  switch (type) {
  case REMOVE_FILTER:
    return {
      ...state,
      appliedFilters: state.appliedFilters.filter(({ column }) => column !== payload),
      comparison: 'maior que',
      column: 'population',
      value: 0,
    };

  case REMOVE_FILTERS:
    return {
      ...state,
      appliedFilters: [],
      comparison: 'maior que',
      column: 'population',
      value: 0,
    };

  case SET_COLUMN:
    return { ...state, column: payload };

  case SET_COMPARISON:
    return { ...state, comparison: payload };

  case SET_FILTER:
    return {
      ...state,
      appliedFilters: [...state.appliedFilters, payload],
      comparison: 'maior que',
      column: 'population',
      value: 0,
    };

  case SET_INPUT:
    return { ...state, input: payload };

  case SET_RESULTS:
    return { ...state, planets: payload };

  case SET_VALUE:
    return { ...state, value: payload };

  default:
    return state;
  }
}

export default reducer;
