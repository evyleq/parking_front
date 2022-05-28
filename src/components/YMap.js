import React from 'react';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import * as api from '../api/v1';

class Ymap extends React.Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.ref = React.createRef();
    this.state = {
      coords: this.props.coords ? this.props.coords : '',
      address: '',
      mapState: { center: [57.153033, 65.534328], zoom: 10 },
    };
  }

  handleClick = (e) => {
    if (!this.props.mygetData) return true;
    e.preventDefault();
    this.updatePlacemark(e.get('coords'));
  };

  updatePlacemark = (coords) => {
    api.getAddress(coords.reverse()).then((res) => {
      let adr =
        res.data.response.GeoObjectCollection.featureMember[0].GeoObject
          .metaDataProperty.GeocoderMetaData.Address.formatted;
      this.setState({ coords: coords.reverse(), address: adr });
      if (this.props.mygetData) this.props.mygetData(coords, adr);
    });
  };

  eeee = (e) => {
    let control = e;
    if (e) {
      e.events.add('resultselect', (e) => {
        var index = e.get('index');
        control.getResult(index).then((res) => {
          this.updatePlacemark(res.geometry._coordinates);
        });
      });
    }
  };
  render() {
    return (
      <YMaps>
        <Map
          state={this.state.mapState}
          height="100%"
          width="100%"
          onClick={this.handleClick}
        >
          {this.state.coords ? <Placemark geometry={this.state.coords} /> : ''}
          {this.props.points
            ? this.props.points.map((point, index) => {
                return (
                  <Placemark
                    key={index}
                    modules={[
                      'geoObject.addon.balloon',
                      'geoObject.addon.hint',
                    ]}
                    geometry={[point.latitude, point.longitude]}
                    properties={{
                      balloonContentBody:
                        point.address +
                        '<br/>' +
                        'Свободные места: ' +
                        (Math.max(point.capacity - point.current, 0) || 0) +
                        '/' +
                        (point.capacity || 0),
                    }}
                  />
                );
              })
            : ''}
          <SearchControl
            instanceRef={this.eeee}
            options={{
              noPlacemark: true,
              placeholderContent: 'Поиск',
            }}
          />
        </Map>
      </YMaps>
    );
  }
}

export default Ymap;
