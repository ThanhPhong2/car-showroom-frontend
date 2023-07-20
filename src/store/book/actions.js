export const ACT_BOOK_FETCH_ID = 'ACT_BOOK_FETCH_ID';

export function actBrandsFetchAll(brands) {
  return {
    type: ACT_BOOK_FETCH_ID,
    payload: brands,
  };
}