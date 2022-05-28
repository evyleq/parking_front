import React, { Component } from 'react';
import Page from './Page';
import ParkingStatistic from '../components/ParkingStatistic';

class ParkingStatisticPage extends Component {
  render() {
    return (
      <Page>
        <ParkingStatistic {...this.props} />
      </Page>
    );
  }
}

export default ParkingStatisticPage;
