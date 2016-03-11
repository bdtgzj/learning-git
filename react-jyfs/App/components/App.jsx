import React from 'react';
import ContentList from './ContentList.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div><ContentList /></div>
    );
  }

}