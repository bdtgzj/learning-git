import React from 'react';
import Content from './Content.jsx'

export default class ContentList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let contents = this.props.data.map(function(v, k) {
      return (
        <Content url={v.url} title={v.title} />
      );
    });

    return (
      <div>{contents}</div>
    );
  }

}