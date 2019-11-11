import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import ExchangeRates from './ExchangeRates';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
});


const App = () => (
  <>
    <Example />
    <ApolloProvider client={client}>
      <ExchangeRates />
    </ApolloProvider>
  </>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App url="/api/comments" />,
    document.getElementById('app')
  );
});

