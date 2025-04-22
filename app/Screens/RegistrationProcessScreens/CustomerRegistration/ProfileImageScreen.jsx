import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { storeProfileImage } from '../../../store_management/actions/actions';

import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MyCamera from '../../../../components/MyCamera';

const ProfilePicture = ({ navigation,route }) => {
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [imageURL, setImageURL] = useState(null);

  const handleUpload = (base64Image) => {
    setProfileImageBase64(base64Image);
    setIsCameraVisible(false); // Hide the camera and show the image preview
  };

  const handleRetake = () => {
    console.log('Retake button pressed');
    setProfileImageBase64(null);
    setIsCameraVisible(true); // Show the camera again
  };

  const dispatch = useDispatch();

  const handleProceed = () => {
    dispatch(storeProfileImage(profileImageBase64)); // Dispatch action to store the image

    console.log('Proceed button pressed');
    navigation.navigate('AadharFrontandBack');
    console.log("Image Url in Take Selfie ", imageURL);
  };

  return (
    <View style={{ flex: 1 }}>
      {isCameraVisible ? (
        <MyCamera
          onUpload={handleUpload}
          onRetake={handleRetake}
          initialCameraView="front"
          setImageURL={setImageURL}
        />
      ) : (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: profileImageBase64 }}
            style={styles.previewImage}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  previewImage: {
    width: '80%',
    height: '60%',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  retakeButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  proceedButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePicture;
