let placeholder = 1

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

var app = express();

// CORS
app.use((req, res, next) => {
  res.set({'Access-Control-Allow-Origin': '*'}); // http://xxx.com.cn
  if (req.method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, X-Requested-With, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    });
    return res.end();
  }
  next();
});

// GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
