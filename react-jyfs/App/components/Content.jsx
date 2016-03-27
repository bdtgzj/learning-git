import React from 'react';

export default class Content extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <a href={this.props.url}>{this.props.title}</a>
      </div>
    );
  }

}