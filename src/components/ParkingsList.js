import React, { Component } from 'react';
import { Col } from 'reactstrap';
import WithCrud from '../hoc/WithCrud';
import ParkingNode from './ParkingNode';

class ParkingsList extends Component {
  state = {
    parkings: [],
  };

  componentDidMount() {
    this.props.read().then((res) => {
      this.setState({ parkings: res.data || [] });
    });
  }

  render() {
    return (
      <div className="parkings-list">
        <div className="row">
          {this.state.parkings.map((parking) => {
            return (
              <Col sm="6" md="4" className="mb-3" key={parking._id}>
                <ParkingNode {...parking} />
              </Col>
            );
          })}
        </div>
      </div>
    );
  }
}

export default WithCrud(ParkingsList, 'parkings');
