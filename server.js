// GraphQL
const app = require("./app");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));
};

mongoose
  .connect("mongodb://127.0.0.1:27017/store")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const PORT = 3000;

app.listen(PORT, () => {
  startApolloServer();
  console.log(`Listening on PORT: ${PORT}`);
});

// 18 ka na
