import { ApolloServer, PubSub } from 'apollo-server';
import mongoose from 'mongoose';

function startServer ({ typeDefs, resolvers }) {
  mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const pubsub = new PubSub();
  const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } });
  server.listen(4001).then(({ url }) => console.log('Server ok', url));
}

export default startServer;