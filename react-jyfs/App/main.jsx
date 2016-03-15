import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(
  <App url={'http://cmsapi.jyfs.com'} />,
  document.body.appendChild(document.createElement('div'))
);

//document.getElementById('container')