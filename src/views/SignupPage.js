import React, { Component } from 'react';
import Page from './Page';
import SignupForm from '../components/SignupForm';

class SignupPage extends Component {
  render() {
    return (
      <Page>
          <SignupForm {...this.props} />
      </Page>
    );
  }
}

export default SignupPage;
