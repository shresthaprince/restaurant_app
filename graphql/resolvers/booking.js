const Table = require('../../models/table')
const Booking = require('../../models/booking')

const { transformBooking, transformTable } = require('./merge')

module.exports = {

    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            })
        } catch (err) {
            throw err;
        }
    },

    bookTable: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const fetchedTable = await Table.findOne({ _id: args.tableId });
        const booking = new Booking({
            user: req.userId,
            table: fetchedTable
        });
        const result = await booking.save();
        return transformBooking(result);
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const booking = await Booking.findById(args.bookingId)
                .populate('table');
            const table = transformTable(booking.table);
            await Booking.deleteOne({ _id: args.bookingId });
            return table;
        } catch (err) {
            throw err;

        }
    }
}