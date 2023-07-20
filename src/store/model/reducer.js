import { ACT_MODELS_FETCH_ALL_BY_BRAND } from './actions';

const initialState = {
  listByBrand: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACT_MODELS_FETCH_ALL_BY_BRAND:
      return {
        ...state,
        listByBrand: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
