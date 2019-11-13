import { gql } from 'apollo-boost';

export const typeDefs = gql`
  extend type Query{
    isLoggedIn: Boolean!,
    cartItems: [ID!],
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }

  extend type Launch {
    isInCart: Boolean!
  }
`;

export const resolvers = {};
