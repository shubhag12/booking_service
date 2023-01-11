const { BookingService } = require("../services/index");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    return res.status(201).json({
      data: response,
      success: true,
      message: "successfully created a booking",
      err: {},
    });
  } catch (error) {
    console.log("error at controllers booking controllers.js");
    return res.status(201).json({
      data: {},
      success: false,
      message: "not able to create a booking",
      err: error,
    });
  }
};
module.exports = {create};
