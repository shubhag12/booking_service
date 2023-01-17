const { BookingService } = require("../services/index");

const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
//const {createChannel}=require('../utils/messageQueue')
const bookingService = new BookingService();

class BookingController {
  constructor() {
    
  }

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
       data:{
        subject:"this is a notification from a queue",
        content:"some queue will subscribe this ",
        recepientEmail:"shubhagarwal123123@gmail.com",
        notificationTime:'2023-01-15 10:00:00'
       } ,
       service:"CREATE_TICKET"
       
       };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      message: "Succesfully published the event",
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      console.log("FROM BOOKING CONTROLLER", response);
      return res.status(200).json({
        message: "Successfully completed booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(501).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
}

module.exports = BookingController;
