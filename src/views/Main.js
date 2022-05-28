import React, { Component } from 'react';

class Main extends Component {
  render() {
    return <div className="p-4">{this.props.children}</div>;
  }
}

export default Main;
