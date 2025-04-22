import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet,Image} from 'react-native';

const PanCard = ({ navigation }) => {

  useEffect(() => {
    console.log('PanCard component mounted');
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const handleTakePanImage = () => {
   
    navigation.navigate('PanCardUpload');
  };

  const handleUploadFromFiles = () => {
    
    navigation.navigate('PanCardUploadFromFile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload PAN Card</Text>
      <Text style={styles.text}>
        Enter your PAN card number and we'll get the required information from the NSDL.
      </Text>

      <Image source={require('../../../../assets/Images/pancard.png')} style={styles.image} resizeMode="contain" />

     

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePanImage}>
          <Text style={styles.buttonText}>Take PAN Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUploadFromFiles}>
          <Text style={styles.buttonText}>Upload from Files</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  title: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    padding: 10,
    fontSize: 15,
  },
  image: {
    width: 400,
    height: 270,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 50,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PanCard;
