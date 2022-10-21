import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import MapView, {Marker, Circle, Polyline} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

export default class Map extends React.Component {
  // constructor(props) {
  //   super(props);
  state = {
    coordinate: {
      latitude: 24.8614622,
      longitude: 67.0099388,
    },

    destination: {
      latitude: 24.820345461851524,
      longitude: 67.03064651720518,
    },

    origin_lat: null,
    origin_lng: null,
    showsUserLocation: true,
  };
  // }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          origin_lat: position.coords.latitude,
          origin_lng: position.coords.longitude,
          error: null,
        });
      },

      error => this.setState({error: error.message}),
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    );
  }

  render() {
    // let {latitude, longitude} = this.state.coordinate;

    console.log(
      this.state.origin_lat,
      this.state.origin_lng,
      'map coordinates',
    );

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {this.state.origin_lat && this.state.origin_lng && (
          <MapView
            // ref={map => (this.map = map)}
            style={[styles.map, {marginBottom: this.state.marginBottom}]}
            initialRegion={{
              latitude: this.state.origin_lat,
              longitude: this.state.origin_lng,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
            showsUserLocation={this.state.showsUserLocation}
            showsMyLocationButton={true}

            // mapPadding={{top: 20, right: 20, bottom: 20, left: 20}}
            // onRegionChangeComplete={region =>
            //   this.setState({
            //     coordinate: region,
            //   })
            // }
            // onMapReady={() => {
            //   this.setState({marginBottom: 0});
            // }}
          >
            <Marker
              coordinate={{
                latitude: this.state.origin_lat,
                longitude: this.state.origin_lng,
              }}
            />

            <Marker coordinate={this.state.destination} />

            <MapViewDirections
              origin={{
                latitude: this.state.origin_lat,
                longitude: this.state.origin_lng,
              }}
              strokeWidth={4}
              strokeColor={'#0c54a3'}
              destination={this.state.destination}
              apikey={'AIzaSyBW6BdbQdOxjogLRmNSfgS4dR3LIXCSQ6M'}
            />
          </MapView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

// AIzaSyBW6BdbQdOxjogLRmNSfgS4dR3LIXCSQ6M
