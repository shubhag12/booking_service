const { BookingRepository } = require("../repository/index");
const axios = require("axios");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
class BookingService {
  constructor() {
    this.BookingRepository = new BookingRepository();
  }
  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;

      const response = await axios.get(getFlightRequestUrl);
      const flightData = response.data.data;
      let priceOfTheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        console.log("insufficent seats");
        throw { error };
      }

      const totalCost = priceOfTheFlight * data.noOfSeats;

      const bookingPayload = { ...data, totalCost };

      const booking = await this.BookingRepository.create(bookingPayload);
      const updateFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestUrl,{totalSeats:flightData.totalSeats-booking.noOfSeats})
      const finalbooking=await this.BookingRepository.update(booking.id,{status:"Booked"})
      return finalbooking;
    } catch (error) {
      console.log("service");
      throw { error };
    }
  }
}
module.exports = BookingService;
