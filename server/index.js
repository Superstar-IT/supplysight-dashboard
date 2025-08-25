const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    // Add any context you need here
  }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();