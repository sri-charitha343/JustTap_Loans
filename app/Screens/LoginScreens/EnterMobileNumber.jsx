import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDrivers, setCustomers, setUserData, setUserType } from '../../store_management/actions/actions';
import { useNavigation } from '@react-navigation/native';

const EnterMobileNumber = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector((state) => state.userData);

  const handleSubmit = async () => {
    if (!mobileNumber.trim()) {
      Alert.alert('Error', 'Please enter a mobile number.');
      return;
    }
    
    try {
      const response = await fetch(`http://192.168.85.170:5000/api/loan/details/${mobileNumber}`);
      const data = await response.json();
      
      console.log('API Response Data:', data); // Log the response data
      if (data) {
        dispatch(setUserData(data));
      } else {
        Alert.alert('Error', 'No data received from the API.');
      }


      
      if (data.existsInBoth) {
        if (data.captainDetails) {
          dispatch(setDrivers(data.captainDetails)); // Updated to use captainDetails
        } else {
          Alert.alert('Error', 'No captain details found.');
        }

        if (data.userDetails) {
          dispatch(setCustomers(data.userDetails)); // Updated to use userDetails
        } else {
          Alert.alert('Error', 'No user details found.');
        }


      dispatch(setUserType('both'));
      dispatch(setUserData({ mobileNumber }));
      navigation.navigate('MobileOTPScreen');

      } else if (data.userDetails) {
        dispatch(setCustomers(data.userDetails)); // This remains unchanged

      dispatch(setUserType('customer'));
      dispatch(setUserData({ mobileNumber }));
      navigation.navigate('MobileOTPScreen');

      } else if (data.captainDetails) {
        dispatch(setUserType('driver'));
        dispatch(setUserData({ mobileNumber }));

      navigation.navigate('MobileOTPScreen');

      } else {
        Alert.alert('Error', 'Mobile number not found.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while checking the mobile number.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
      />
      <TouchableOpacity 
        style={[styles.button, !mobileNumber.trim() && styles.disabledButton]} 
        onPress={handleSubmit} 
        disabled={!mobileNumber.trim()}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterMobileNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0F4A97',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  }
});