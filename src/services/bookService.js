import { API } from "./api";

export const bookService = {
  getBook: function (item) {
    return API.post('/bookings',item)
  }
}