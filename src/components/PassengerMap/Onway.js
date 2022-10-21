// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from 'react-native';
// import MapView, {Marker, Circle, Polyline} from 'react-native-maps';

// export default class Onway extends React.Component {
//   state = {
//     coordinate: {
//       latitude: 24.8614622,
//       longitude: 67.0099388,
//     },

//     marginBottom: 1,
//   };

//   render() {
//     let {latitude, longitude} = this.state.coordinate;

//     // console.log(this.state.coordinate, 'map coordinates');

//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <MapView
//           ref={map => (this.map = map)}
//           style={[styles.map, {marginBottom: this.state.marginBottom}]}
//           initialRegion={{
//             latitude,
//             longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           // showsUserLocation={true}
//           // showsMyLocationButton={true}

//           mapPadding={{top: 20, right: 20, bottom: 20, left: 20}}
//           onRegionChangeComplete={region =>
//             this.setState({
//               coordinate: region,
//             })
//           }
//           onMapReady={() => {
//             this.setState({marginBottom: 0});
//           }}>
//           {/* <Marker
//             coordinate={{
//               latitude,
//               longitude,
//             }}
//           /> */}
//         </MapView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
