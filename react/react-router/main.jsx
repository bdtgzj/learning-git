import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link, browserHistory, NoMatch} from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>This is App!</div>
    );
  }
}

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>This is About!</div>
    );
  }
}

class Index extends React.Component {
  render() {
    return (
      <div>
        <h2>Index!</h2>
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="about" component={About}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('container'));