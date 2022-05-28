import React, { Component } from 'react';
import Page from './Page';
import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <Page>
          <LoginForm {...this.props} />
      </Page>
    );
  }
}

export default LoginPage;
