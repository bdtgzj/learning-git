var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

// Define Custom Type
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: {type: graphql.GraphQLString}
  }
})

// Define Query Type and Resolver
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function (_, {id}) {
        return mockDatabase[id]
      }
    }
  }
})

// Construct Scheme
var schema = new graphql.GraphQLSchema({query: queryType});

var mockDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

// GraphiQL
/*
query {
  user(id: "a") {
    id
  }
}
*/