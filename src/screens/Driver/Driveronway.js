// import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Dimensions,
// } from 'react-native';
// import {Container, Content, Header} from 'native-base';
// import Onway from '../../components/DriverMap/Onway';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const Driveronway = ({navigation}) => {
//   return (
//     <View style={styles.sectionContainer}>
//       <Header style={{backgroundColor: '#fff'}}>
//         <View
//           style={{
//             width: '8%',
//             height: '100%',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.openDrawer();
//             }}>
//             <FontAwesome
//               style={styles.mainIcon}
//               name="bars"
//               color="grey"
//               size={26}
//             />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             width: '92%',
//             height: '100%',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text
//             style={{
//               fontSize: 16,
//               fontWeight: 'bold',
//               // textAlign: 'center',
//               // margin: 15,
//               color: '#0c54a3',
//             }}>
//             Driver onway
//           </Text>
//         </View>
//       </Header>
//       <View style={styles.mapStyle}>
//         <Onway />
//       </View>

//       <View style={{alignItems: 'center', justifyContent: 'center'}}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Main')}
//           style={styles.buttonOutline}>
//           <Text style={styles.buttonOutlineText}>Cancel Ride</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Driveronway;

// const styles = StyleSheet.create({
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//   },

//   sectionContainer: {
//     flex: 1,
//   },
//   mapStyle: {
//     height: '88%',
//   },

//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },

//   buttonContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   buttonOutline: {
//     backgroundColor: 'white',
//     height: 50,
//     width: 600,
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     margin: 1,

//     shadowColor: 'rgba(0,0,0, .2)', // IOS
//     shadowOffset: {height: 1, width: 1}, // IOS
//     shadowOpacity: 1, // IOS
//     shadowRadius: 1, //IOS
//   },

//   buttonText: {
//     color: 'white',
//     fontWeight: '100',
//     fontSize: 11,
//   },

//   buttonOutlineText: {
//     color: '#0c54a3',
//     fontWeight: '500',
//     fontSize: 14,
//   },

//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 10,
//   },
//   sectionStyle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#fff',
//     height: 60,
//     borderRadius: 5,
//     margin: 2,

//     shadowColor: 'black',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,

//     elevation: 6,
//   },
// });
