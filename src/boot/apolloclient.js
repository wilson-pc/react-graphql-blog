import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://blog-api-sepia.vercel.app/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const auth = JSON.parse(localStorage.getItem('auth')) || null;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: auth ? `Bearer ${auth.access_token}` : '',
    },
  };
});
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  assumeImmutableResults: false,
});
