const Table = require('../../models/table');
const User = require('../../models/users');
const { dateToString } = require('../../helpers/date')

const tables = async tableIds => {
    try {
        const tables = await Table.find({ _id: { $in: tableIds } });
        return tables.map(table => {
            return transformTable(table);
        });
    } catch (err) {
        throw err;
    }

};

const singleTable = async tableId => {
    try {
        const table = await Table.findById(tableId);
        return transformTable(table);
    } catch (err) {
        throw err;

    }
};



const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            createdTables: tables.bind(this, user._doc.createdTables)
        };

    } catch (err) {
        throw err;
    }
};

const transformTable = table => {
    return {
        ...table._doc,
        _id: table.id,
        creator: user.bind(this, table.creator)
    };
}

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        table: singleTable.bind(this, booking._doc.table),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
};

exports.transformTable = transformTable;
exports.transformBooking = transformBooking;

// exports.user = user;
// exports.tables = tables;
// exports.singleTable = singleTable;