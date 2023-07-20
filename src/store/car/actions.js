import { carService } from '../../services/carService'

export const ACT_FETCH_SEARCH_CARS = 'ACT_FETCH_SEARCH_CARS';
export const ACT_FETCH_CARS = 'ACT_FETCH_CARS'
export const ACT_CARS_FETCH_SEARCH = 'ACT_CARS_FETCH_SEARCH'
export const ACT_FETCH_BOOKING_CARS='ACT_FETCH_BOOKING_CARS'
export const ACT_CARS_FETCH_SEARCH_PRICE='ACT_CARS_FETCH_SEARCH_PRICE'
export const ACT_CARS_FETCH_SEARCH_AREA='ACT_CARS_FETCH_SEARCH_AREA'
export function actFetchSearchCars(cars) {
  return {
    type: ACT_FETCH_SEARCH_CARS,
    payload: cars,
  };
}
export function actFetchCars(cars) {
  return {
    type: ACT_FETCH_CARS,
    payload: cars,
  };
}
export function actFetchBookingCars(car) {
  console.log(car);
  return {
    type: ACT_FETCH_BOOKING_CARS,
    payload: car,
  };
}


export function actFetchCarsAsync(id) {
  return async (dispatch) => {
    const response = await carService.getItem(id);
    console.log("data",response.data);
    dispatch(actFetchCars(response.data))
  }
}

export function actCarsFetchSearch(cars) {
  return {
    type: ACT_CARS_FETCH_SEARCH,
    payload: cars
  }
}
export function actCarsFetchSearchArea(cars) {
  return {
    type: ACT_CARS_FETCH_SEARCH_AREA,
    payload: cars
  }
}
export function actCarsFetchSearchAsyncArea(params) {
  return async (dispatch) => {
    const response = await carService.getAll(params);
    console.log("data",response.data);
    dispatch(actCarsFetchSearchArea(response.data))
  }
}

export function actCarsFetchSearchAsync(params) {
  return async (dispatch) => {
    const response = await carService.getAll(params);
    console.log("data",response.data);
    dispatch(actCarsFetchSearch(response.data))
  }
}

export function actCarsFetchSearchPrice(cars) {
  return {
    type: ACT_CARS_FETCH_SEARCH_PRICE,
    payload: cars
  }
}
export function actCarsFetchSearchPriceAsync(params) {
  return async (dispatch) => {
    const response = await carService.getAll(params);
    console.log("data",response.data);
    dispatch(actCarsFetchSearchPrice(response.data))
  }
}