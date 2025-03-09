import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setDrivers, setCustomers, setUserData } from '../../store_management/actions/actions'; // Updated import path

const MobileOTPScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Access mobileNumber and userType from the Redux store
  const mobileNumber = useSelector((state) => state.userData.mobileNumber);
  const userType = useSelector((state) => state.userData.userType);

  const handleSubmit = async () => {
    if (otp === '1234') {
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        console.log('User Type:', userType); // Debugging
  
        if (userType === 'both') {
          navigation.navigate('SelectACatogory');
        } else if (userType === 'driver') {
          navigation.navigate('EnterDriverId');
        } else if (userType === 'customer') {
          navigation.navigate('BasicProfileDetailsCustomer');
        } else {
          Alert.alert('Error', 'Invalid user type');
        }
      }, 1000); // Simulate a delay for a better UX
    } else {
      Alert.alert('Error', 'Invalid OTP, please try again');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Please wait, fetching the profile details...</Text>
        </View>
      ) : (
        <View style={styles.otpContainer}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>We've sent an OTP to your mobile number</Text>

          <TextInput
            style={styles.otpInput}
            placeholder="Enter OTP"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            maxLength={4}
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MobileOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  otpContainer: {
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: 20,
  },
  otpInput: {
    height: 50,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0F4A97',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
