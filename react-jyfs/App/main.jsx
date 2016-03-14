import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(
  <App url={'http://localhost'} />,
  document.body.appendChild(document.createElement('div'))
);

//document.getElementById('container')