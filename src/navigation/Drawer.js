// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
// } from '@react-navigation/drawer';

// import TabNavigator from "./DTabNav";
// import List from "../screens/Driver/List";


// const Drawer = createDrawerNavigator();

// const CustomDrawer = props => {
 
//   return (

//     <View style={{ flex: 1,backgroundColor:'white' }}>

//       <DrawerContentScrollView {...props}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: 20,
//             backgroundColor: 'white',
//             marginBottom: 20,
//           }}
//         >
//           <View style={{backgroundColor:'white'}}>
//             <Text style={{fontWeight:'bold'}}>{profile.fullname}</Text>
//           </View>

//           <Image
//             source={{
//               uri:
//                 profile.avatar ||
//                 null,
//             }}
//             style={{ width: 60, height: 60, borderRadius: 30 }}
//           />
//         </View>

//         <DrawerItemList {...props} />
//       </DrawerContentScrollView>

//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           right: 0,
//           left: 0,
//           bottom: 50,
//           backgroundColor: 'white',
//           padding: 20,
//         }}
//       >
//         <Text>Log Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator  
//       screenOptions={{
//         headerShown: true,
//         headerStyle: {
//           backgroundColor: '#f7fcff',
//           elevation: 0,
          
          
//           shadowOpacity: 0,
//         },
//         headerTitle: <Seacrcbar/>,
//       }}
//        drawerContent={props => <CustomDrawer {...props} />}
//     >
//       <Drawer.Screen component={TabNavigator} name='Driver Hand' />
//       <Drawer.Screen component={List} name='Posted rides' />
      
      
      
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;
