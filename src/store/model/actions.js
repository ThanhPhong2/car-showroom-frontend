import {modelService} from '../../services/modelService'

export const ACT_MODELS_FETCH_ALL_BY_BRAND = 'ACT_MODELS_FETCH_ALL_BY_BRAND';

export function actModelsFetchAllByBrand(models) {
  return {
    type: ACT_MODELS_FETCH_ALL_BY_BRAND,
    payload: models,
  };
}
export function actModelsFetchAllByBrandAsync(idBrand) {
  return async (dispatch) => {
    const response = await modelService.getAllByBrand(idBrand);
    console.log(response.data);
    dispatch(actModelsFetchAllByBrand(response.data))
  }
}
