import React from 'react';
import ContentList from './ContentList.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    // init this.state
    this.state = { data: [{url:'http://google.com', title: 'google'}, {url:'http://baidu.com', title: 'baidu'}] };
  }

  render() {
    return (
      <div><ContentList data={this.state.data} /></div>
    );
  }

}