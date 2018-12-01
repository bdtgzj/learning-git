let placeholder = 0

var {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

// 1. building a type schema
var schema = new GraphQLSchema({
  query: new GraphQLObjectType({ // type
    name: 'RootQueryType',
    fields: { // fields
      hello: {
        type: GraphQLString,
        resolve() { // resolve function can return a value, a promise, or an array of promises.
          return 'world'
        }
      }
    }
  })
})

// 2. serving queries against that type schema.
var clientQuery = '{ hello }'
graphql(schema, clientQuery).then(result => {
  console.log(result) // {"data":{"hello":"world"}}
})

var clientQueryError = '{ hello1 }'
graphql(schema, clientQueryError).then(result => {
  console.log(JSON.stringify(result)) // {"errors":[{"message":"Cannot query field \"hello1\" on type \"RootQueryType\". Did you mean \"hello\"?","locations":[{"line":1,"column":3}]}]}
})