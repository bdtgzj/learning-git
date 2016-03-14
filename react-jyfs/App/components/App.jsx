import React from 'react';
import ContentList from './ContentList.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    // init this.state
    // { data: [{url:'http://google.com', title: 'google'}, {url:'http://baidu.com', title: 'baidu'}] }
    this.state = {data: []};
  }

  loadDataFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount() {
    this.loadDataFromServer();
  }

  render() {
    return (
      <div><ContentList data={this.state.data} /></div>
    );
  }

}