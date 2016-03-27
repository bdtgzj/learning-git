import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory, NoMatch} from 'react-router';
import {Container, View, NavBar, List} from 'amazeui-touch';
import $ from 'jquery';

export default class Forecast extends React.Component {

  constructor(props) {
    super(props);
    // init this.state
    // { data: [{url:'http://google.com', title: 'google'}, {url:'http://baidu.com', title: 'baidu'}] }
    this.state = {data: []};
  }

  loadDataFromServer() {
    $.ajax({
      url: this.props.url || 'http://cmsapi.jyfs.org/forecast',
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

  renderItems() {
    return this.state.data.map((item, index) => {
      return (
        <List.Item
          href={item.url}
          title={item.title}
          key={index}
        />
      );
    });
  }

  render() {
    return (
      <View>
        <NavBar
          title={'放生预告'}
          amStyle="primary"
        />
        <Container scrollable>
          <List>
            {this.renderItems()}
          </List>
        </Container>
      </View>
    );
  }

}