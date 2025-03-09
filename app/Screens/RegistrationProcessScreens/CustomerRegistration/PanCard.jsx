import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storePanNumber } from '../../../store_management/actions/actions';


import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert, Image, Keyboard } from 'react-native';

const PanCard = ({ navigation }) => {
  const [panNumber, setPanNumber] = useState('');
  const [isPanValid, setIsPanValid] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validatePanNumber = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handlePanChange = (text) => {
    const upperCaseText = text.toUpperCase();
    setPanNumber(upperCaseText);
    setIsPanValid(validatePanNumber(upperCaseText));
  };

const dispatch = useDispatch();

const handleGoPress = () => {
    if (isPanValid) {
        dispatch(storePanNumber(panNumber));
    }


    if (!isPanValid) {
      Alert.alert('Invalid PAN', 'Please enter a valid PAN number in the format AAAAA9999A.');
      return;
    }
    Keyboard.dismiss();
    setShowOtpField(true);
  };

  const handleVerifyPress = () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP.');
      return;
    }
    Alert.alert('Success', 'PAN verified successfully!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload PAN Card</Text>
      <Text style={styles.text}>Enter your PAN card number and we'll get the required information from the NSDL.</Text>

      <Image source={require('../../../../assets/Images/pancard.png')} style={styles.image} resizeMode="contain" />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter PAN Number"
          value={panNumber}
          onChangeText={handlePanChange}
          keyboardType="default"
          maxLength={10}
        />
        <TouchableOpacity
          style={[styles.goButton, isPanValid && styles.goButtonActive]}
          onPress={handleGoPress}
          disabled={!isPanValid}
        >
          <Text style={styles.goButtonText}>Go</Text>
        </TouchableOpacity>
      </View>

      {showOtpField && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
          />
          <TouchableOpacity
            style={[styles.goButton, otp.length === 6 && styles.goButtonActive]}
            onPress={handleVerifyPress}
            disabled={otp.length !== 6}
          >
            <Text style={styles.goButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
  image: {
    width: 400,
    height: 270,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 20,
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
  },
  goButton: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  goButtonActive: {
    backgroundColor: 'yellow',
  },
  goButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PanCard;
