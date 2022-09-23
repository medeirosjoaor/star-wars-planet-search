import {
  REMOVE_FILTER,
  REMOVE_FILTERS,
  SET_COLUMN,
  SET_COMPARISON,
  SET_FILTER,
  SET_INPUT,
  SET_ORDER,
  SET_RESULTS,
  SET_SORT,
  SET_SORT_COLUMN,
  SET_VALUE,
} from '../constants';

const partialInitialState = {
  comparison: 'maior que',
  column: 'population',
  value: 0,
};

function reducer(state, { payload, type }) {
  switch (type) {
  case REMOVE_FILTER:
    return {
      ...state,
      ...partialInitialState,
      appliedFilters: state.appliedFilters.filter(({ column }) => column !== payload),
    };

  case REMOVE_FILTERS:
    return {
      ...state,
      ...partialInitialState,
      appliedFilters: [],
    };

  case SET_COLUMN:
    return { ...state, column: payload };

  case SET_COMPARISON:
    return { ...state, comparison: payload };

  case SET_FILTER:
    return {
      ...state,
      ...partialInitialState,
      appliedFilters: [...state.appliedFilters, payload],
    };

  case SET_INPUT:
    return { ...state, input: payload };

  case SET_ORDER:
    return { ...state, isSorted: false, sortOrder: payload };

  case SET_RESULTS:
    return { ...state, planets: payload };

  case SET_SORT:
    return { ...state, isSorted: true };

  case SET_SORT_COLUMN:
    return { ...state, isSorted: false, sortColumn: payload };

  case SET_VALUE:
    return { ...state, value: payload };

  default:
    return state;
  }
}

export default reducer;
