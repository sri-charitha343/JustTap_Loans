import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { storeAadharFrontImage, storeAadharBackImage } from '../../../store_management/actions/aadharActions';

import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const AadharUploadFromFile = ({ navigation,route }) => {
  const [aadharFrontFile, setAadharFrontFile] = useState(null);
  const [aadharBackFile, setAadharBackFile] = useState(null); 

 
  const dispatch = useDispatch();

  const handleUploadFile = async (type) => {

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'], 
        copyToCacheDirectory: true,
      });
      console.log(" Result ", result)
      if (!result.canceled) {
        console.log(" Result inside if ", result)
        const file = result.assets[0];  
        if (type === 'front') {
          setAadharFrontFile(file);
          dispatch(storeAadharFrontImage(file));

        } else {
          setAadharBackFile(file);
          dispatch(storeAadharBackImage(file));

        }
      } else {
        console.log('Document picker canceled');
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const proceedToNext = () => {

    navigation.navigate('PanFrontandBack');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Aadhar Card</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Aadhar Front</Text>
        {aadharFrontFile ? (
          <Text style={styles.fileText}>{aadharFrontFile.name}</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleUploadFile('front')}>
            <Text style={styles.buttonText}>Upload Aadhar Front</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Aadhar Back</Text>
        {aadharBackFile ? (
          <Text style={styles.fileText}>{aadharBackFile.name}</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleUploadFile('back')}>
            <Text style={styles.buttonText}>Upload Aadhar Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {aadharFrontFile && aadharBackFile && (
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

export default AadharUploadFromFile;
