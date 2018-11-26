var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Customize Type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides)
  }

  roll({numRolls}) {
    var output = []
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce())
    }
    return output
  }

}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!,
    rollOnce: Int!,
    roll(numRolls: Int!): [Int]
  }
  type Query {
    quoteOfTheDay: String,
    random: Float!,
    rollDice(numDice: Int!, numSides: Int): [Int],
    getDie(numSides: Int): RandomDie
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
  getDie: ({numSides}) => {
    return new RandomDie(numSides || 9)
  }
};

var app = express();
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