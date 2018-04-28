import "./index.css";

import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

// import { createHttpLink } from 'apollo-link-http'
import { link } from './graphql/link'
import App from "./App";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: createHttpLink({ 
  //   uri: 'http://localhost:3030/graphql'
  // })
  link
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
