import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setStdIdVerified } from '../../../store_management/actions/actions';

import MyCamera from '../../../../components/MyCamera';

const StudentIdUpload = ({ navigation, route }) => {
 
  const [StdIDFrontImage, setStdIDFrontImage] = useState(null);
  const [StdIDBackImage, setStdIDBackImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(null);
  const [StdIDFrontUrl, setStdIDFrontUrl] = useState(null);
  const [StdIDBackUrl, setStdIDBackUrl] = useState(null);

  const dispatch = useDispatch();
 
  const handleFrontUpload = (base64Image) => {

    setStdIDFrontImage(base64Image);
    setIsCapturing(null); // Close camera after upload
  };

  // StdID Back Image Upload
  const handleBackUpload = (base64Image) => {


    setStdIDBackImage(base64Image);
    setIsCapturing(null); // Close camera after upload
  };

  const handleRetake = () => {
    console.log('Retake button pressed');
    setIsCapturing(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {isCapturing ? (
        <MyCamera
          onUpload={isCapturing === 'front' ? handleFrontUpload : handleBackUpload}
          setImageURL={isCapturing === 'front' ? setStdIDFrontUrl : setStdIDBackUrl}
          onRetake={handleRetake}
          initialCameraView="back"
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Text style={styles.label}>Student Id Front</Text>
            {StdIDFrontImage ? (
              <Image source={{ uri: StdIDFrontImage }} style={styles.image} />
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => setIsCapturing('front')}>
                <Text style={styles.text}>Upload Front</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.imageContainer}>
            <Text style={styles.label}>Student Id Back</Text>
            {StdIDBackImage ? (
              <Image source={{ uri: StdIDBackImage }} style={styles.image} />
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => setIsCapturing('back')}>
                <Text style={styles.text}>Upload Back</Text>
              </TouchableOpacity>
            )}
          </View>

          {StdIDFrontImage && StdIDBackImage && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                dispatch(setStdIdVerified(true));
                navigation.navigate('BasicProfileDetailsCustomer')
                console.log("StdID Details: ",StdIDFrontUrl, StdIDBackUrl);
              }}
            >
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0F4A97',
    borderRadius: 5,
    padding: 10,
    width: 150,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#0F4A97',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: 150,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StudentIdUpload;
