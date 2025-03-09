import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyCamera = ({ onUpload, onRetake, initialCameraView = 'front' }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [base64Image, setBase64Image] = useState(null);  // State for storing base64 image
  const [showImage, setShowImage] = useState(false);
  const [cameraView, setCameraView] = useState(initialCameraView);

  const actions = [
    { resize: { width: 300 } },
  ];

  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo && photo.uri) {
          const { base64 } = await manipulateAsync(photo.uri, [], { base64: true });
          const base64Str = `data:image/jpeg;base64,${base64}`;
          setBase64Image(base64Str);  // Store the base64 image in state
          setShowImage(true);  // Show image preview
          onUpload(base64Str);  // Call the onUpload prop to pass the base64 image back to parent
        } else {
          console.error('Failed to capture photo: photo or photo.uri is undefined');
        }
      } catch (error) {
        console.error('An error occurred while taking the picture:', error);
      }
    }
  };

  const flipCamera = () => {
    setCameraView(cameraView === 'front' ? 'back' : 'front');
  };

  const handleRetake = () => {
    setShowImage(false);
    setBase64Image(null);  // Clear the base64 image on retake
    onRetake();  // Trigger the retake action via prop
  };

  return (
    <View style={styles.container}>
      {showImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: base64Image }} style={styles.image} />
          <View style={styles.buttonContainerImage}>
            <TouchableOpacity style={styles.button} onPress={() => onUpload(base64Image)}>
              <Text style={styles.text}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRetake}>
              <Text style={styles.text}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView style={styles.camera} ref={cameraRef} facing={cameraView}>
          <View style={styles.buttonContainerCamera}>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
              <View style={styles.innerCircle} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
              <Icon name="flip-camera-android" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
  camera: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerCamera: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerImage: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  flipButton: {
    position: 'absolute',
    right: 40,
    bottom: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 100,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default MyCamera;
