import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory, NoMatch} from 'react-router';
import {Container, View, NavBar, List} from 'amazeui-touch';
import $ from 'jquery';

export default class HaiTao extends React.Component {

  constructor(props) {
    super(props);
    // init this.state
    // { data: [{id:'1', title: 'google'}, {id:'2', title: 'baidu'}] }
    this.state = {data: []};
  }

  loadDataFromServer() {
    $.ajax({
      url: this.props.url || 'http://cmsapi.jyfs.org/haitao',
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
          linkComponent={Link}
          linkProps={{to: `/haitao/${item.id}`}}
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
          title={'海涛法师弘法集锦'}
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