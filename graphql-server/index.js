const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const compression = require("compression");

// Define GraphQL schema
const typeDefs = gql`
  type Country {
    name: String
    capital: String
    region: String
    population: Int
    flag: String
  }

  type Query {
    countries: [Country]
    country(name: String!): Country
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    countries: async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      return countries.map((country) => ({
        name: country.name.common,
        capital: country.capital ? country.capital[0] : "N/A",
        region: country.region,
        population: country.population,
        flag: country.flags ? country.flags.png : "",
      }));
    },
    country: async (_, { name }) => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const countries = await response.json();
      const country = countries[0];
      return {
        name: country.name.common,
        capital: country.capital ? country.capital[0] : "N/A",
        region: country.region,
        population: country.population,
        flag: country.flags ? country.flags.png : "",
      };
    },
  },
};

// Initialize Express
const app = express();

// Apply gzip compression middleware
app.use(compression());

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set the path to /graphql
server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });

  // Start the server
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://192.168.23.96:4000/graphql`)
  );
});
