var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Customize Type, If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, {content, author}) {
    this.id = id
    this.content = content
    this.author = author
  }
}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }
  type Message {
    id: ID!
    content: String
    author: String
  }
  type Query {
    getMessage(id: ID!): Message
    getMessageAll: [Message]
  }
  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
    deleteMessage(id: ID!): Message
  }
`);

// Mock Database
var mockDatabase = {}

// The root provides a resolver function for each API endpoint
var root = {
  getMessage: ({id}) => {
    if (!mockDatabase[id]) {
      throw new Error('no message exists with id ' + id)
    }
    return new Message(id, mockDatabase[id])
  },
  getMessageAll: () => {
    var messageAll = []
    for (var key in mockDatabase) {
      if (mockDatabase.hasOwnProperty(key)) {
        var element = mockDatabase[key];
        messageAll.push(new Message(key, element))
      }
    }
    return messageAll
  },
  createMessage: ({input}) => {
    // Create a random id for record.
    var id = require('crypto').randomBytes(10).toString('hex')
    mockDatabase[id] = input
    return new Message(id, input)
  },
  updateMessage: ({id, input}) => {
    if (!mockDatabase[id]) {
      throw new Error('no message exists with id ' + id)
    }
    // This replaces all old data, but some apps might want partial update.
    mockDatabase[id] = input
    return new Message(id, input)
  },
  deleteMessage: ({id}) => {
    var message = mockDatabase[id]
    if (!message) {
      throw new Error('no message exists with id ' + id)
    }
    delete mockDatabase[id]
    return new Message(id, message)
  },
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
// Create
mutation {
  createMessage(input: {
    author: "andy",
    content: "hope is a good thing",
  }) {
    id
  }
}

// Read
query {
  getMessageAll {
    id
    content
    author
  }
  getMessage(id: "cda1614554680fede5a5") {
    id
  }
}

// Update
mutation {
  updateMessage(id: "cda1614554680fede5a5", input: {
    author: "andy1",
    content: "hope is a good thing1",
  }) {
    id
  }
}

// Delete
mutation {
  deleteMessage(id: "cda1614554680fede5a5") {
    id
    author
    content
  }
}
*/