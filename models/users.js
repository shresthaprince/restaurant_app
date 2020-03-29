const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdTables: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Table'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);