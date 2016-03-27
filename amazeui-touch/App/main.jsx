import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  List
} from 'amazeui-touch';
// import App from './components/App.jsx';

ReactDOM.render(
  <List>
    <List.Item
      after="after"
      title="List Item 1"
    />
  </List>,
  document.body.appendChild(document.createElement('div'))
);

//document.getElementById('container')