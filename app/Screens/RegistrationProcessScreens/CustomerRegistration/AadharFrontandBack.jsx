import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet,  Alert, Image, KeyboardAvoidingView,ScrollView } from 'react-native';


const AadharUpload = ({ navigation }) => {
 


  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const handleTakeAadharImage = () => {
    navigation.navigate('AadharImageUpload');
  };

  const handleUploadFromFiles = () => {
    navigation.navigate('AadharUploadFromFile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}>
              Enter your Aadhaar and we'll get your information from UIDAI. By sharing your Aadhaar
              details, you hereby confirm that you have shared such details voluntarily.
            </Text>
            <Image
              source={require('../../../../assets/Images/aadhar.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.justTapText}>
              <Text style={styles.justTapFont}>Just Tap!</Text> to upload Aadhar Images
            </Text>

     </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleTakeAadharImage}>
              <Text style={styles.buttonText}>Take Aadhar Image</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleUploadFromFiles}>
              <Text style={styles.buttonText}>Upload from Files</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 20,
  },
  justTapText: {
    color: 'white',
    padding: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  justTapFont: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'SofadiOne',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 90,
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
    marginRight: 10,
  },
  goButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  goButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    gap: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flex: 0.45,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AadharUpload;
