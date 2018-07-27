let placeholder = 0

var { graphql, buildSchema } = require('graphql')

// Schema = Type + Field
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello GraphQL!'
  }
}

//
var clientQuery = '{ hello }'
// 使用 graphql 函数来执行查询
graphql(schema, clientQuery, root).then( result => {
  console.log(result)
})
