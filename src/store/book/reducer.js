import { ACT_BOOK_FETCH_ID } from "./actions";

const initialState = {
  book: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACT_BOOK_FETCH_ID:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;