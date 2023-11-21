// Imports necessary packages and modules
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource"); // Imports the EtherDataSource class
const typeDefs = importSchema("./schema.graphql"); // Imports GraphQL schema

require("dotenv").config(); // Loads environment variables

// Defines resolvers for GraphQL queries
const resolvers = {
  Query: {
    // Resolver for fetching ether balance by address
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver for getting total supply of Ether
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver for fetching the latest Ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver for retrieving block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
}; 

// Creates an ApolloServer instance
const server = new ApolloServer({
  typeDefs, // GraphQL schema
  resolvers, // Resolvers for schema
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Initializes the EtherDataSource
  }),
});

server.timeout = 0; // Sets server timeout
// Starts the server on port 9000
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); // Logs server start message with URL
});
