import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';


const Takeselfie = ({ navigation, route }) => {



  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

const handleTakeSelfie = async () => {
    navigation.navigate('ProfileImageScreen'); // Navigate without passing the image

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload Your Photo</Text>
      <View style={styles.content}>
        <Text style={{ fontSize: 16, color: 'white' }}>
          Please note that once you submit your profile photo, it can only be changed in limited circumstances.
        </Text>
        <Text style={styles.instructions}>
        {"1. Face the camera and make sure your face is clearly visible.\n"}
        {"2. Make sure the photo is well lit, free of glare, and in focus.\n"}
        {"3. No photos of a photo, filters, or alterations."}
        </Text>
        <Image source={require('../../../../assets/Images/takeselfie.jpg')} style={styles.image} resizeMode="contain"/>
      </View>
      <View style={styles.footer}>
      </View>

      <View style={styles.footer}>

        <Text style={{ color: 'white', padding: 20, marginBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 19, fontFamily: 'SofadiOne' }}>Just Tap!</Text> {' '}
          to complete your profile
        </Text>
        <TouchableOpacity style={styles.Button} onPress={handleTakeSelfie}>
          <Text style={styles.ButtonText}>Take Selfie</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  title: {
    paddingTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  content: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    marginTop: 30,
    marginBottom: 20, 
  },
  instructions: {
    color: 'white',
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 50,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40, 
  },
  Button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  ButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
 export default Takeselfie;
