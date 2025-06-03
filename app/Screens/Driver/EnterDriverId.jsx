import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'; 
import { setDrivers } from '../../store_management/actions/actions';
import { store } from '../../store_management/store';

const EnterDriverId = () => {
  const [driverId, setDriverId] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleVerify = async () => {
    if (!driverId.trim()) {
      Alert.alert('Error', 'Please enter a valid Driver ID.');
      return;
    }

    try {
      const response = await axios.get(`http://192.168.29.13:5000/api/loan/checkCaptainId/${driverId}`);
      console.log("Full API Response:", JSON.stringify(response.data, null, 2));

      if (response.data.exists) { 
        const driverData = response.data.captainDetails;
        const payload = {
          existsInBoth: response.data.exists,
          data: response.data.captainDetails
        };
        
        dispatch(setDrivers(payload));
        
        navigation.navigate('BasicProfileDetailsDriver');
      } else {
        Alert.alert('Invalid ID', 'Driver ID not found in the system.');
      }
    } catch (error) {
      console.error("Verification error:", error);
      Alert.alert('Error', 'An error occurred while verifying the Driver ID. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Driver ID</Text>
      <Text style={styles.subtitle}>Please enter your Driver ID to verify.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter ID"
        value={driverId}
        onChangeText={setDriverId}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterDriverId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0F4A97',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
