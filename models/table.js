const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    minCapacity: {
        type: Number,
        required: true
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('Table', tableSchema);
