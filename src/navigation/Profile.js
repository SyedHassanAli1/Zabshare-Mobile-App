import React from 'react';
import { TextInput,Text, View, StyleSheet,Button,TouchableOpacity} from 'react-native';

const Profile = () => {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
  <View style={{backgroundColor:'white',borderLeftColor:'white'}}>
    <View style={{alignItems:'center',marginBottom:40}}>
      <Text style={{margin:10,marginTop:18,fontSize:20,fontWeight:'bold'}}>
  Edit Profile </Text>
  </View>
  <Text style={{alignItems:'center',color:'#0198c9'}}>Name</Text>

  <TextInput  style={styles.margin}

  label="Your name"
  keyboardType='default'
  placeholder='e.g name'
  
  />

  <Text style={{alignItems:'center',color:'#0198c9'}}>Email Address</Text>
  <TextInput  style={styles.margin}
  label="Email Address"
  keyboardType='email-address'
  placeholder='e.g abc123@abc.com'
  />

<Text style={{alignItems:'center',color:'#0198c9',marginTop:10}}>Phone Number</Text>
<TextInput style={styles.margin}
label ='phone number'
  keyboardType='numeric'
  placeholder='e.g phone number'
  />

<Text style={{alignItems:'center',color:'#0198c9'}}>Address</Text>
  <TextInput  style={styles.margin}
    label="Address"
  keyboardType='default'
  placeholder='e.g 12-a street abc'
  
  />

<TouchableOpacity
      
      style={{height: 35,
        marginTop:5,
        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',}}
    >
      <Text style={{ fontSize: 14, color: '#0198c9' }}>Change password</Text>
    </TouchableOpacity>
    <TouchableOpacity
      
      style={[styles.containerbttn]}
    >
      <Text style={{ fontSize: 18, color: '#fff' }}>Save</Text>
    </TouchableOpacity>
  
    
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerbttn: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#005798',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    
    backgroundColor:'white',
    padding: 8,
  },
 TextInput__cont: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor:'white',
    alignItems: 'center',
  },

  margin: {
    

     margin: 2,
     width: 250,
   


borderColor: '#1b1b33',
height: 40,

borderRadius: 8,
fontSize: 20,
marginBottom: 15,
//textDecorationLine:'underline',
marginStart:1,
borderBottomWidth:1

  }
});


export default Profile;

