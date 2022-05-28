import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

class ParkingNode extends Component {
  state = {};

  render() {
    return (
      <div className="parking-node">
        <Card>
          <CardBody>
            <h4 className="mb-4">{this.props.address || 'Без адреса'}</h4>
            <h6>Мест всего: {this.props.capacity || 0}</h6>
            <h6>
              Мест свободно:{' '}
              {Math.max(this.props.capacity - this.props.current, 0)}
            </h6>
            <Link
              className="btn btn-secondary mt-2 mr-2"
              to={'/pk/parkings/' + this.props._id}
            >
              Редактировать
            </Link>
            <Link
              className="btn btn-success mt-2"
              to={'/pk/' + this.props._id + '/stats'}
            >
              Статистика
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ParkingNode;
