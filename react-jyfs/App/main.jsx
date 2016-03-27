import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link, hashHistory, NoMatch} from 'react-router';
import App from './components/App.jsx';
import Index from './components/Index.jsx';
import Forecast from './components/Forecast.jsx';
import Record from './components/Record.jsx';
import HaiTao from './components/HaiTao.jsx';
import HaiTaoDetail from './components/HaiTaoDetail.jsx';


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="/forecast" component={Forecast}/>
        <Route path="/record" component={Record}/>
        <Route path="/haitao" component={HaiTao}/>
        <Route path="/haitao/:id" component={HaiTaoDetail}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
), document.getElementById('root'));
});