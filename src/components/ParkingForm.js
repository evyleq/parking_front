import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../api/v1';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import Ymap from '../components/YMap';

class ParkingForm extends React.Component {
  state = {
    name: '',
    address: null,
    latitude: null,
    longitude: null,
    capacity: null,
    current: null,
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      api.getParkingById(this.props.match.params.id).then((parkingObj) => {
        if (!parkingObj) return;
        this.setState(parkingObj);
      });
    }
  }

  addParkingHandler = () => {
    let state = this.state;
    if (this.props.match.params.id) {
      api
        .updateParking(this.props.match.params.id, state)
        .then(() => {
          this.setState({ saved: true });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .addParking(state)
        .then((response) => {
          if (response) {
            this.setState({ saved: true });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  deleteParkingHandler = () => {
    api
      .deleteParking(this.props.match.params.id)
      .then(() => {
        this.setState({ saved: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleMapData = (coords, address) => {
    this.setState({
      latitude: coords[0],
      longitude: coords[1],
      address,
    });
  };

  render() {
    if (this.state.saved) {
      return <Redirect to="/pk/parkings" />;
    }
    if (this.props.match.params.id && !this.state._id) return '';
    return (
      <Card>
        <CardHeader>
          <strong>Редактирование парковки</strong>
        </CardHeader>
        <CardBody>
          <Form action="" method="post" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="capacity">Название</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={this.handleInputChange}
                  autoComplete="name"
                  value={this.state.name || ''}
                />
                <FormText className="help-block">
                  Введите название парковки
                </FormText>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="capacity">Общее количество мест</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="capacity"
                  name="capacity"
                  placeholder="10"
                  onChange={this.handleInputChange}
                  autoComplete="capacity"
                  value={this.state.capacity || 0}
                />
                <FormText className="help-block">
                  Введите количество мест
                </FormText>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="address">Адрес</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="address"
                  name="address"
                  readOnly
                  autoComplete="address"
                  value={this.state.address || ''}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="geolocation">Локация</Label>
              </Col>
              <Col xs="12" md="9" style={{ height: '300px' }}>
                <Ymap
                  mygetData={this.handleMapData}
                  coords={
                    this.state.latitude && this.state.longitude
                      ? [this.state.latitude, this.state.longitude]
                      : ''
                  }
                />
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            size="sm"
            color="primary"
            className="mr-2"
            onClick={this.addParkingHandler}
          >
            <i className="fa fa-dot-circle-o"></i> Сохранить
          </Button>
          {!!this.props.match.params.id && (
            <Button
              type="button"
              size="sm"
              color="danger"
              onClick={this.deleteParkingHandler}
            >
              <i className="fa fa-ban"></i> Удалить
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }
}

export default ParkingForm;
