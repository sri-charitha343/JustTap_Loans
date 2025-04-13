import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const LoansPage = () => {
  const navigation = useNavigation();
  const [loanAmount, setLoanAmount] = useState(500);
  const [editingAmount, setEditingAmount] = useState(false);
  const loanAmountRef = useRef(loanAmount);

  const formattedDate = moment().add(30, 'days').format('DD/MM/YYYY');
  const dispatch = useDispatch();

  const handleGetMoney = () => {
    dispatch({
      type: 'SET_LOAN_TAKEN',
      payload: {
        isTaken: true,
        amount: loanAmount,
        term: 30,
        repaymentDate: formattedDate,
      },
    });
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quick Loan</Text>
      <View style={styles.loanContainer}>
        <Text style={styles.label}>Loan Amount</Text>
        <TouchableOpacity onPress={() => setEditingAmount(true)}>
          {editingAmount ? (
            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              value={loanAmount.toString()}
              onChangeText={(text) => {
                const numericValue = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                setLoanAmount(numericValue);
                loanAmountRef.current = numericValue;
              }}
              onBlur={() => {
                const clampedValue = Math.max(500, Math.min(10000, loanAmount));
                setLoanAmount(clampedValue);
                loanAmountRef.current = clampedValue;
                setEditingAmount(false);
              }}
              autoFocus
            />
          ) : (
            <Text style={styles.amountDisplay}>₹{loanAmount}</Text>
          )}
        </TouchableOpacity>

        <Slider
          style={styles.slider}
          minimumValue={500}
          maximumValue={10000}
          value={loanAmountRef.current}
          step={500}
          onValueChange={(value) => (loanAmountRef.current = value)}
          onSlidingComplete={(value) => setLoanAmount(value)}
          minimumTrackTintColor="#0f4a97"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#0f4a97"
        />
        <View style={styles.rangeContainer}>
          <Text style={styles.rangeText}>₹500</Text>
          <Text style={styles.rangeText}>₹10,000</Text>
        </View>
      </View>

      <Text style={styles.noteText}>Repayment should be done in 30 days</Text>
      <View style={styles.infoBox}>
        <View style={styles.row}>
          <Text style={styles.infoText}>Repayment Date</Text>
          <Text style={styles.infoText}>{formattedDate}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGetMoney}>
        <Text style={styles.buttonText}>Get Money</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoansPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  loanContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  slider: {
    height: 40,
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  rangeText: {
    fontSize: 16,
    color: '#666',
  },
  infoBox: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#0f4a97',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#ff4500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  amountInput: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f4a97',
    borderBottomWidth: 1,
    borderColor: '#0f4a97',
    padding: 5,
    textAlign: 'center',
    marginVertical: 10,
  },
  amountDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f4a97',
    textAlign: 'center',
    marginVertical: 10,
  },
  noteText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
});
