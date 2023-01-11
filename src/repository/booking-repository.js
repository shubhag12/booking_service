const {Booking}=require('../models/index');

class BookingRepository{
    async create(data){
        try {
            const booking= await Booking.create(data);
            return booking;         
        } catch (error) {
            console.log(error)
            throw {error};
        }
    }
    async update(bookingId,data){
        try {
            const booking = await Booking.findByPk(bookingId);
            if(data.status) {
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            console.log(error)
            throw {error};
        }
    }
}

module.exports = BookingRepository;




