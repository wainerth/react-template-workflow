import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://www.pangeatech.com.uy:3558/graphql', // URL de tu API
});

const client = new ApolloClient({
  link: httpLink,        
  cache: new InMemoryCache(),
});

export default client;