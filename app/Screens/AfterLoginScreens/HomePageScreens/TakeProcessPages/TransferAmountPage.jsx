import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const TransferAmountPage = () => {
  const navigation = useNavigation();
  const bankDetails = useSelector(state => state.bankDetails);

  // Example other options - these can be replaced with real data as needed
  const otherOptions = [
    { id: '1', label: 'UPI Transfer' },
    { id: '2', label: 'Wallet Transfer' },
    { id: '3', label: 'Cash Pickup' },
  ];

  const [selectedOption, setSelectedOption] = useState('bank'); // 'bank' for bankDetails, or id of other option

  const renderOption = ({ item }) => {
    const isSelected = selectedOption === item.id;
    return (
      <TouchableOpacity
        style={[styles.optionContainer, isSelected && styles.selectedOption]}
        onPress={() => setSelectedOption(item.id)}
      >
        <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Transfer Option</Text>

      {/* Bank Details Option */}
      <TouchableOpacity
        style={[styles.optionContainer, selectedOption === 'bank' && styles.selectedOption]}
        onPress={() => setSelectedOption('bank')}
      >
        <Text style={[styles.optionText, selectedOption === 'bank' && styles.selectedOptionText]}>
          Bank Transfer:  {bankDetails.bankName} - {bankDetails.accountNumber}
        </Text>
      </TouchableOpacity>

      {/* Other Options */}
      <FlatList
        data={otherOptions}
        renderItem={renderOption}
        keyExtractor={item => item.id}
        style={styles.otherOptionsList}
      />

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransferAmountPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7faff',
    justifyContent: 'center',
    marginTop: 30,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E3A59',
  },
  optionContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  selectedOption: {
    borderColor: '#007B55',
    backgroundColor: '#DFF6E4',
  },
  optionText: {
    fontSize: 16,
    color: '#444',
  },
  selectedOptionText: {
    color: '#007B55',
    fontWeight: 'bold',
  },
  otherOptionsList: {
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#007B55',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
