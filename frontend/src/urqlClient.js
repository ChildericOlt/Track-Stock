import { createClient } from 'urql';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';

const client = createClient({
  url: 'http://localhost:8000/graphql',
  exchanges: [multipartFetchExchange],
});

export default client;