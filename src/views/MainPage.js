import React, { Component } from 'react';
import Page from './Page';
import Ymap from '../components/YMap';
import * as api from '../api/v1/index';

class MainPage extends Component {
  state = {};

  componentDidMount() {
    api
      .getParkings()
      .then((response) => {
        this.setState({ parkings: response.data });
      })
      .catch();
  }

  render() {
    return (
      <Page>
        <h1 className="mb-4">
          Наличие свободных мест на парковках города Тюмень
        </h1>
        <div
          className="main-map"
          style={{ paddingTop: '56.25%', position: 'relative' }}
        >
          <div
            className="main-map__inner"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
            }}
          >
            <Ymap points={this.state.parkings || []} />
          </div>
        </div>
      </Page>
    );
  }
}

export default MainPage;
