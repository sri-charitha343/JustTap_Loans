import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, { useState } from 'react';

const PanNumberPage = ({navigation}) => {
  const [panNumber, setPanNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan.toUpperCase());
  };

  const handleChange = (text) => {
    setPanNumber(text);
    setIsValid(validatePAN(text));
  };

  const handleContinue = () => {
    navigation.navigate('MoreDetailsPage')
  };

  return (
    <ScrollView Styles={{backgroundColor: '#fff',flex: 1}}>
      <View style={styles.container}>
      <Text style={styles.infoText}>
        Enter your PAN number to proceed with the account opening process.
      </Text>

      <TextInput
        style={[styles.input, !isValid && styles.invalidInput]}
        value={panNumber}
        onChangeText={handleChange}
        placeholder="Enter PAN Number"
        autoCapitalize="characters"
        maxLength={10}
      />

      {!isValid && panNumber.length > 0 && (
        <Text style={styles.errorText}>Invalid PAN format. Example: ABCDE1234F</Text>
      )}

      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PanNumberPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    marginTop: '80%',
    
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0f5a97',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
