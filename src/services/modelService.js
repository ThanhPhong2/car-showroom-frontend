import { API } from './api';

export const modelService = {
  getAllByBrand: function (idBrand) {
    return API.get('/brands/'+idBrand);
  },
  getAllWithCars: function () {
    return API.get('/models?_embed=cars');
  },
};
