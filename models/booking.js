const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    table: {
        type: Schema.Types.ObjectId,
        ref: 'Table'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);