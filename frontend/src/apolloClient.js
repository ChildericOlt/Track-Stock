import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// The ApolloClient setup for file uploads is a bit special.
// We need to use the `createUploadLink` library.

import { createUploadLink } from 'apollo-upload-client';

// Create an HTTP link to your GraphQL API endpoint
const httpLink = createUploadLink({
  uri: 'http://localhost:8000/graphql',
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;