const { BookingRepository } = require("../repository/index");
const axios = require("axios");
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
class BookingService {
  constructor() {
    this.BookingRepository = new BookingRepository();
  }
  async createBooking(data) {
    try {
      const flightId = data.flightId;
      let getFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
      console.log(getFlightRequestUrl);
      const flight=await axios.get(getFlightRequestUrl);
      console.log("from booking service",flight.data);
      return flight.data;
    } catch (error) {
      console.log("service");
      throw { error };
    }
  }
}
module.exports = BookingService;
