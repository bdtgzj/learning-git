import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

let graphQLServer = 'http://localhost:4000'; // window.location.origin

let graphqlParamNames = {
  query: true,
  variables: true,
  operationName: true
};

function graphQLFetcher(graphQLParams) {
  return fetch(graphQLServer + '/graphql', {
    method: 'POST',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />, document.getElementById('app'));
});