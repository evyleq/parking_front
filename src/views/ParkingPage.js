import React, { Component } from 'react';
import Page from './Page';
import ParkingForm from '../components/ParkingForm';

class ParkingPage extends Component {
  render() {
    return (
      <Page>
          <ParkingForm {...this.props} />
      </Page>
    );
  }
}

export default ParkingPage;
