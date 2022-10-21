// import React from 'react';
// import {
//   StyleSheet,
//   Platform,
//   TouchableOpacity,
//   Image,
//   View,
//   Text,
//   Alert,
//   Button,
//   TextInput,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// export default class Switch_Screen extends React.Component {
//   constructor() {
//     super();
//     this.state = {isVisible: true};
//   }
//   Hide_Splash_Screen = () => {
//     this.setState({
//       isVisible: false,
//     });
//   };
//   componentDidMount() {
//     var that = this;
//     setTimeout(function () {
//       that.Hide_Splash_Screen();
//     }, 6000);
//   }
//   render() {
//     let Splash_Screen = (
//       <View style={styles.SplashScreen_RootView}>
//         <View style={styles.SplashScreen_ChildView}>
//           <Image
//             source={require('../assets/images/logo.png')}
//             style={{width: '80%', height: '80%', resizeMode: 'contain'}}
//           />
//         </View>
//       </View>
//     );

//     return (
//       <View style={styles.MainContainer}>
//         <View style={styles.viewcont}>
//           <Text
//             style={{
//               fontSize: 13,
//               color: '#0c54a3',
//               justifyContent: 'center',
//               textAlign: 'center',
//               fontWeight: '500',
//             }}>
//             Choose your Account Type
//           </Text>

//           <TouchableOpacity
//             style={styles.button1}
//             disabled={false}
//             onPress={() => this.props.navigation.navigate('Driver login')}>
//             <Icon name="drivers-license" size={80} color="#0c54a3" />
//             <Text
//               style={{
//                 fontSize: 16,
//                 color: '#0c54a3',
//                 fontWeight: '600',
//                 padding: 6,
//                 justifyContent: 'center',
//                 textAlign: 'center',
//               }}>
//               Driver
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.button1}
//             disabled={false}
//             onPress={() => this.props.navigation.navigate('Passenger login')}>
//             <MaterialCommunityIcons
//               name="seat-passenger"
//               size={80}
//               color="#0c54a3"
//             />
//             <Text
//               style={{
//                 fontSize: 16,
//                 color: '#0c54a3',
//                 fontWeight: '600',
//                 padding: 6,
//                 justifyContent: 'center',
//                 textAlign: 'center',
//               }}>
//               Passenger
//             </Text>
//           </TouchableOpacity>
//         </View>
//         {this.state.isVisible === true ? Splash_Screen : null}
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: Platform.OS === 'ios' ? 20 : 0,
//     backgroundColor: '#fff',
//   },
//   SplashScreen_RootView: {
//     justifyContent: 'center',
//     flex: 1,
//     margin: 10,
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   SplashScreen_ChildView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     flex: 1,
//   },

//   img: {
//     height: 100,
//     width: 170,
//   },

//   viewcont: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   button1: {
//     backgroundColor: '#fff',
//     width: 700,
//     height: 200,
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     margin: 1,
//     shadowColor: 'rgba(0,0,0, .2)', // IOS
//     shadowOffset: {height: 1, width: 1}, // IOS
//     shadowOpacity: 1, // IOS
//     shadowRadius: 1, //IOS
//     justifyContent: 'center',
//   },
// });
