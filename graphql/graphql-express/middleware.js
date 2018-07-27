var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Express Middleware
function logMiddleware(req, res, next) {
  console.log('client ip: ', req.ip)
  next()
}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    ip: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  ip: (args, req) => {
    return req.ip
  },
};

var app = express();
app.use(logMiddleware);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

// GraphiQL
/*
{
  quoteOfTheDay,
  random,
  rollDice(numDice: 3, numSides: 8),
  getDie(numSides: 7) {
    numSides,
    rollOnce,
    roll(numRolls: 3)
  }
}
*/