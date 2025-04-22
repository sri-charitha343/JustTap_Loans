import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BankDetailsPage = ({navigation}) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFilled = bankName && accountNumber && ifscCode;
    setIsFormValid(allFilled && isChecked);
  }, [bankName, accountNumber, ifscCode, isChecked]);

  const handleSave = () => {
    console.log({ bankName, accountNumber, ifscCode });
     navigation.navigate('LoanProcessingScreen');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>🏦 Add Your Bank Details</Text>

        {/* Bank Name */}
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: HDFC Bank"
          value={bankName}
          onChangeText={setBankName}
          placeholderTextColor="#999"
        />

        {/* Account Number */}
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your account number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        {/* IFSC Code */}
        <Text style={styles.label}>IFSC Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: HDFC0001234"
          value={ifscCode}
          onChangeText={setIfscCode}
          autoCapitalize="characters"
          placeholderTextColor="#999"
        />

        {/* Checkbox */}
        <TouchableOpacity
          onPress={() => setIsChecked(!isChecked)}
          style={styles.checkboxRow}
        >
          <MaterialIcons
            name={isChecked ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={isChecked ? '#007B55' : '#ccc'}
          />
          <Text style={styles.checkboxText}>
            I confirm the above bank details are correct
          </Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveBtn,
            { backgroundColor: isFormValid ? '#007B55' : '#aaa' },
          ]}
          disabled={!isFormValid}
          onPress={handleSave}
        >
          <MaterialIcons name="check-circle" size={20} color="white" />
          <Text style={styles.saveText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BankDetailsPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f7faff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2E3A59',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
    marginTop: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
    color: '#222',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
  saveBtn: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
