import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { storePanFrontImage, storePanBackImage } from '../../../store_management/actions/panActions';

import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const PanCardUploadFromFile = ({ navigation }) => {
  const [panFrontFile, setPanFrontFile] = useState(null);  // State for PAN front file
  const [panBackFile, setPanBackFile] = useState(null);    // State for PAN back file

  const dispatch = useDispatch();

  const handleUploadFile = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],  // Restrict to PDF and images
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];  // Get the selected file
        if (type === 'front') {
          setPanFrontFile(file);
          dispatch(storePanFrontImage(file)); // Dispatch action to store the front image
        } else {
          setPanBackFile(file);
          dispatch(storePanBackImage(file)); // Dispatch action to store the back image
        }
      } else {
        console.log('Document picker canceled');
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const proceedToNext = () => {
    if (!panFrontFile || !panBackFile) {
      Alert.alert('Error', 'Please upload both PAN front and back files.');
      return;
    }

    // Navigate to the next screen with both files and PAN number
    navigation.navigate('CompleteCustomerProfile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload PAN Card</Text>

      {/* Section for PAN Front File Upload */}
      <View style={styles.section}>
        <Text style={styles.label}>PAN Front</Text>
        {panFrontFile ? (
          <Text style={styles.fileText}>{panFrontFile.name}</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleUploadFile('front')}>
            <Text style={styles.buttonText}>Upload PAN Front</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Section for PAN Back File Upload */}
      <View style={styles.section}>
        <Text style={styles.label}>PAN Back</Text>
        {panBackFile ? (
          <Text style={styles.fileText}>{panBackFile.name}</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleUploadFile('back')}>
            <Text style={styles.buttonText}>Upload PAN Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Proceed button once both files are uploaded */}
      {panFrontFile && panBackFile && (
        <TouchableOpacity style={styles.proceedButton} onPress={proceedToNext}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fileText: {
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  proceedButton: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
});

export default PanCardUploadFromFile;
