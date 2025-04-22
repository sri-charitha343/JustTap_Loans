import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MyCamera from '../../../../components/MyCamera';

const CameraCapturePage = ({ navigation, route }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(true);

  const handleUpload = (base64Image) => {
    setCapturedImage(base64Image);
    setIsCameraVisible(false);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsCameraVisible(true);
  };

  const handleProceed = () => {
    if (route.params?.onCapture) {
      route.params.onCapture(capturedImage);
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      {isCameraVisible ? (
        <MyCamera
          onUpload={handleUpload}
          onRetake={handleRetake}
          initialCameraView={route.params?.initialCameraView || 'back'}
        />
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
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

export default CameraCapturePage;