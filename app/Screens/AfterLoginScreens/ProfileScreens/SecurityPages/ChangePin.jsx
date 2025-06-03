import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChangePin() {
  const [step, setStep] = useState(1);
  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleNext = () => {
    if (step === 1 && oldPin.length === 4) {
      setStep(2);
    } else if (step === 2 && newPin.length === 4) {
      setStep(3);
    }
  };

  const handleChangePin = () => {
    if (newPin === confirmPin && confirmPin.length === 4) {
      setStep(4);
    }
  };

  const handleDone = () => {
    setStep(1);
    setOldPin('');
    setNewPin('');
    setConfirmPin('');
  };

  const renderInput = (label, value, onChange, isVisible, toggleVisibility) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pinInputRow}>
        <TextInput
          style={styles.pinInput}
          keyboardType="numeric"
          secureTextEntry={!isVisible}
          maxLength={4}
          value={value}
          onChangeText={onChange}
        />
        <TouchableOpacity onPress={toggleVisibility}>
          <Icon name={isVisible ? 'eye-off' : 'eye'} size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {step < 4 && <Text style={styles.title}>Change Your PIN</Text>}

      {step === 1 && renderInput("Enter Old PIN", oldPin, setOldPin, showOldPin, () => setShowOldPin(!showOldPin))}
      {step === 2 && renderInput("Enter New PIN", newPin, setNewPin, showNewPin, () => setShowNewPin(!showNewPin))}
      {step === 3 && renderInput("Re-Enter New PIN", confirmPin, setConfirmPin, showConfirmPin, () => setShowConfirmPin(!showConfirmPin))}

      {step === 1 || step === 2 ? (
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      ) : step === 3 ? (
        <TouchableOpacity style={styles.button} onPress={handleChangePin}>
          <Text style={styles.buttonText}>Change PIN</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.successContainer}>
          <Icon name="checkmark-circle" size={80} color="#4CAF50" />
          <Text style={styles.successTitle}>PIN Changed!</Text>
          <Text style={styles.successMessage}>Your PIN has been successfully changed.</Text>
          <TouchableOpacity style={[styles.button, { width:'80%' }]} onPress={handleDone}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pinInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  pinInput: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#0f4a97',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  successMessage: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
