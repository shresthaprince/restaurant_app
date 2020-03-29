const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Booking {
    _id: ID!
    table: Table!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Table {
_id: ID!
number: Int!
minCapacity: Int!
maxCapacity: Int!
description: String!
creator: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdTables: [Table!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input TableInput {
number: Int!
minCapacity: Int!
maxCapacity: Int!
description: String!
}

input UserInput {
    email: String!
    password: String!
}

type RootQuery{
tables: [Table!]!
bookings: [Booking!]!
login(email: String!, password: String!): AuthData!
}           

type RootMutation {
createTable(tableInput: TableInput): Table
createUser(userInput: UserInput): User
bookTable(tableId: ID!): Booking!
cancelBooking(bookingId: ID!): Table!
}

schema {
query: RootQuery
mutation: RootMutation
}
`)