import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory, NoMatch} from 'react-router';
import {Container, View, NavBar, List} from 'amazeui-touch';
import $ from 'jquery';

export default class HaiTaoDetail extends React.Component {

  constructor(props) {
    super(props);
    // init this.state
    // { data: {content:'xxx', title: 'google', date: ''} }
    this.state = {data: {}};
  }

  loadDataFromServer() {
    $.ajax({
      url: this.props.url || ('http://cmsapi.jyfs.org/haitao/' + this.props.params.id),
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

  dataProcessing() {
    this.state.data.title = this.state.data.title && this.state.data.title.slice(this.state.data.title.indexOf('】')+1);
    this.state.data.introtext = this.state.data.introtext && this.state.data.introtext.replace(/width="700"/, 'width="100%"');
    this.state.data.introtext = this.state.data.introtext && this.state.data.introtext.replace(/height="436"/, '');
    this.state.data.introtext = this.state.data.introtext && this.state.data.introtext.replace(/<p>\s+<\/p>/g, '');
  }

  render() {
    const backNav = {
      component: Link,
      icon: 'left-nav',
      title: '返回',
      props: { to: '/haitao' }
    };

    this.dataProcessing();

    return (
      <View>
        <NavBar
          title={this.state.data.title}
          amStyle="primary"
          leftNav={[backNav]}
        />
        <Container scrollable>
          <div dangerouslySetInnerHTML={{__html: this.state.data.introtext}} />
        </Container>
      </View>
    );
  }

}