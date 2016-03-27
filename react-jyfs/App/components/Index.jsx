import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory, NoMatch} from 'react-router';
import {Container, View, NavBar, Group} from 'amazeui-touch';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    // init this.state
    // { data: [{url:'http://google.com', title: 'google'}, {url:'http://baidu.com', title: 'baidu'}] }
    //this.state = {data: []};
  }

  render() {
    return (
      <View>
        <NavBar
          amStyle="primary"
          title="首页"
        />
        <Container scrollable>
          <Group
            header="首页"
            noPadded
          >
          </Group>
        </Container>
      </View>
    );
  }

}