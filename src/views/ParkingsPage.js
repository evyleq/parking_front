import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from './Page';
import ParkingsList from '../components/ParkingsList';

class ParkingsPage extends Component {
  render() {
    return (
      <Page>
          <h1 className="mb-3">Парковки</h1>
          <ParkingsList />
          <Link to='/pk/parkings/new' className="btn btn-primary">Добавить</Link>
      </Page>
    );
  }
}

export default ParkingsPage;
