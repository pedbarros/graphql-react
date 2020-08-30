const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String,
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation{
    createUser(name: String!, email: String!): User!
  }
`;
const users = [
  { _id: String(Math.random()), name: 'Pedro Barros', email: 'pedro@email.com', active: true },
  { _id: String(Math.random()), name: 'Marcos Batotos', email: 'marcos@email.com', active: false },
  { _id: String(Math.random()), name: 'Pablo Barros', email: 'pablo@email.com', active: true },    
];

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    users: () => users,
    getUserByEmail: (_, args) => users.find(email => email.email === args.email),
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true
      }

      users.push(newUser);
      return newUser;
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log('Server started', url));
