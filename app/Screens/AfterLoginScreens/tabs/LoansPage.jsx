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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

const LoansPage = () => {
  const navigation = useNavigation();
  const route = useRoute();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.loanType === undefined) {
        navigation.setParams({ loanType: 0 });
      }
    });
    return unsubscribe;
  }, [navigation, route.params]);

  const loanType = route.params?.loanType ?? 0;

  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(5);
  const [editingAmount, setEditingAmount] = useState(false);

  const loanAmountRef = useRef(loanAmount);
  const loanTermRef = useRef(loanTerm);

  const formattedDate = moment().add(loanTerm, 'days').format('DD/MM/YYYY');

  const getLoanLimits = () => {
    switch (loanType) {
      case 1:
        return { min: 5000, max: 50000, title: 'Personal Loan', termMax: 20 };
      case 2:
        return { min: 500, max: 5000, title: 'Easy Loan', termMax: 10 };
      case 3:
        return { min: 10000, max: 100000, title: 'Business Loan', termMax: 45 };
      default:
        return { min: 500, max: 300000, title: 'Loan Calculator', termMax: 90 };
    }
  };

  const { min, max, title, termMax } = getLoanLimits();

  const dispatch = useDispatch();

  const handleGetMoney = () => {
    dispatch({
      type: 'SET_LOAN_TAKEN',
      payload: {
        isTaken: true,
        amount: loanAmount,
        term: loanTerm,
        repaymentDate: formattedDate,
      },
    });
    navigation.navigate('Home')
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
        // Clamp value inside min/max on blur
        const clampedValue = Math.max(min, Math.min(max, loanAmount));
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
          minimumValue={min}
          maximumValue={max}
          value={loanAmountRef.current}
          step={500}
          onValueChange={(value) => (loanAmountRef.current = value)}
          onSlidingComplete={(value) => setLoanAmount(value)}
          minimumTrackTintColor="#0f4a97"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#0f4a97"
        />
        <View style={styles.rangeContainer}>
          <Text style={styles.rangeText}>₹{min}</Text>
          <Text style={styles.rangeText}>₹{max}</Text>
        </View>

        <Text style={styles.label}>Loan Term</Text>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={termMax}
          value={loanTermRef.current}
          step={1}
          onValueChange={(value) => (loanTermRef.current = value)}
          onSlidingComplete={(value) => setLoanTerm(value)}
          minimumTrackTintColor="#0f4a97"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#0f4a97"
        />
        <View style={styles.termTicksContainer}>
          {[...Array(Math.floor(termMax / 5)).keys()].map((i) => {
            const val = (i + 1) * 5;
            return val <= termMax ? (
              <Text key={val} style={styles.tickLabel}>
                {val}
              </Text>
            ) : null;
          })}
        </View>
        <View style={styles.rangeContainer}>
          
          <Text style={styles.rangeText}>5 days</Text>
          <Text style={styles.rangeText}>{termMax} days</Text>
        </View>
        
      </View>

      <View style={styles.infoBox}>
        <View style={styles.row}>
          <Text style={styles.infoText}>Loan</Text>
          <Text style={styles.infoText}>₹{loanAmount}</Text>
        </View>
      </View>
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
  termTicksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: -10,
  },
  tickLabel: {
    fontSize: 7,
    color: '#333',
  },
});
