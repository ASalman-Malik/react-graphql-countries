import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Countries from "./Countries";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryDetails from "./CountryDetails";
import Dashboard from "./Dashboard";
import "./index.css";

// Create an HttpLink
const httpLink = new HttpLink({
  uri: "http://192.168.23.96:4000/graphql", // URL of your GraphQL server
});

// Middleware to add headers
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Accept-Encoding': 'gzip',
    },
  };
});

// Combine links
const link = authLink.concat(httpLink);

// Initialize Apollo Client
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/country-list" element={<Countries />} />
        <Route path="/country/:name" element={<CountryDetails />} />
      </Routes>
    </Router>
  </ApolloProvider>
);
