const Table = require('../../models/table');
const User = require('../../models/users');
const { transformTable } = require('./merge');

module.exports = {
    tables: async () => {
        try {
            const tables = await Table.find()
            return tables.map(table => {
                return transformTable(table);
            })
        } catch (err) {
            throw err;
        }
    },

    createTable: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const table = new Table({
            number: args.tableInput.number,
            minCapacity: args.tableInput.minCapacity,
            maxCapacity: args.tableInput.maxCapacity,
            description: args.tableInput.description,
            creator: req.userId
        });
        let createTable;
        try {
            const result = await table
                .save()
            createdTable = transformTable(result);
            const creator = await User.findById(req.userId);

            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdTables.push(table);
            await creator.save();

            return createdTable;
        } catch (err) {
            console.log(err);
            throw err;
        };
    },

}