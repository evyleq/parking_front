import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';

class Page extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <Header />
        <Main>
            {this.props.children}
        </Main>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Page;
