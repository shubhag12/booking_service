const { BookingService } = require("../services/index");
const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    console.log("booking");
    const response = await bookingService.createBooking(req.body);
    console.log("from booking controller", response);
    return res.status(201).json({
      data: response,
      success: true,
      message: "successfully created a booking",
      err: {},
    });
  } catch (error) {
    console.log("error at controllers booking controllers.js");
    console.log("from booking controller", error);
    return res.status(201).json({
      data: {},
      success: false,
      message: "not able to create a booking",
      err: error,
    });
  }
};
module.exports = { create };
