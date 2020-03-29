const authResolver = require('./auth');
const tableResolver = require('./tables');
const bookingResolver = require('./booking');

const rootResolver = {
    ...authResolver,
    ...tableResolver,
    ...bookingResolver
};

module.exports = rootResolver;