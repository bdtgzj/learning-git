import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory, NoMatch} from 'react-router';
import {Container, TabBar} from 'amazeui-touch';
import $ from 'jquery';
import ContentList from './ContentList.jsx';

export default class App extends React.Component {
  constructor(props) {
    
    super(props);
    // init this.state
    // { data: [{url:'http://google.com', title: 'google'}, {url:'http://baidu.com', title: 'baidu'}] }
    this.state = {data: []};
  }

  render() {

    const {
      location,
      params,
      children,
      ...props,
    } = this.props;
    const transition = children.props.transition || 'sfr';

    return (
      <Container direction="column" id="root-container">
        <Container transition={transition}>
          {React.cloneElement(children, {key: location.key})}
        </Container>
        
        <TabBar amStyle="primary">
          <TabBar.Item
            component={Link}
            icon="home"
            title="首页"
            selected={this.state.selected === 'home'}
            to="/"
          />
          <TabBar.Item
            component={Link}
            icon="bars"
            title="放生预告"
            selected={this.state.selected === 'forecast'}
            to="/forecast"
          />
          <TabBar.Item
            component={Link}
            icon="compose"
            title="放生纪实"
            selected={this.state.selected === 'record'}
            to="/record"
          />
          <TabBar.Item
            component={Link}
            icon="gear"
            title="海涛弘法"
            selected={this.state.selected === 'haitao'}
            to="/haitao"
          />
        </TabBar>
      </Container>
    );
  }

}