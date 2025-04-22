import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAadharNumber , setAadharVerified} from '../../../store_management/actions/actions';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert, Image, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';

const AadharUpload = ({ navigation }) => {
  const dispatch = useDispatch(); // Declare dispatch only once

  const [aadharNumber, setAadharNumberState] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validateAadharNumber = () => {
    if (!/^\d{12}$/.test(aadharNumber)) return 'Aadhaar number must be exactly 12 digits.';
    return null;
  };

  const handleGoPress = () => {
    dispatch(setAadharNumber(aadharNumber)); 
    dispatch(setAadharVerified(true));


    const validationError = validateAadharNumber();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    Keyboard.dismiss();
    setShowOtpInput(true);
    Alert.alert('OTP Sent', 'An OTP has been sent to your registered mobile number.');
  };

  const handleVerifyPress = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }
    Alert.alert('Success', 'Aadhaar verification successful!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.title}>You moved to the next step in registration</Text>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}>
              Enter your Aadhaar and we'll get your information from UIDAI. By sharing your Aadhaar
              details, you confirm that you have shared them voluntarily.
            </Text>
            <Image source={require('../../../../assets/Images/aadhar.png')} style={styles.image} resizeMode="contain" />

            <Text style={styles.justTapText}>
              <Text style={styles.justTapFont}>Just Tap!</Text> to enter your Aadhar number and upload files
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Aadhar Number"
                value={aadharNumber}
                onChangeText={setAadharNumberState}
                keyboardType="numeric"
                maxLength={12}
              />
              <TouchableOpacity
                style={[styles.goButton, { backgroundColor: aadharNumber.length === 12 ? 'yellow' : 'grey' }]}
                onPress={handleGoPress}
                disabled={aadharNumber.length !== 12}
              >
                <Text style={styles.goButtonText}>Go</Text>
              </TouchableOpacity>
            </View>

            {showOtpInput && (
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
                  style={[styles.goButton, { backgroundColor: otp.length === 6 ? 'yellow' : 'grey' }]}
                  onPress={handleVerifyPress}
                  disabled={otp.length !== 6}
                >
                  <Text style={styles.goButtonText}>Verify</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 20,
  },
  justTapText: {
    color: 'white',
    padding: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  justTapFont: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'SofadiOne',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 10,
  },
  goButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  goButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default AadharUpload;
