import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveAmount } from '../../../store_management/actions/actions';

const { width } = Dimensions.get('window');

const TakeOrPayPage = ({navigation}) => {
  const [input, setInput] = useState('');
  const enteredAmount = parseInt(input || '0');

  const loan = useSelector((state) => state.loan);
  const availableAmount = loan?.amount || 0;
  const percentage = Math.min((enteredAmount / availableAmount) * 100, 100);
  const dispatch = useDispatch();
  const handlePress = (val) => {
    if (val === '←') {
      setInput((prev) => prev.slice(0, -1));
    } else if (val === 'C') {
      setInput('');
    } else {
      setInput((prev) => (prev + val).slice(0, 6));
    }
  };

  const handleWithdraw = () => {
    if (enteredAmount > 0 && enteredAmount <= availableAmount) {
      const currentDate = new Date();
      const repaymentDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
      
      dispatch(updateActiveAmount({
        amount: enteredAmount,
        withdrawnAmount: enteredAmount,
        repaymentDate: repaymentDate.toISOString().split('T')[0]
      }));
      navigation.goBack();
    }
  };

  const dialPad = ['1', '2', '3', '4', '5', '6', '7', '8', '9','0', '←',  'C'];

  return (
    <LinearGradient colors={['#e3f2fd', '#ffffff']} style={styles.container}>
      <Text style={styles.title}>💸 Select Loan Amount</Text>

      <View style={styles.circleWrapper}>
        <View style={styles.progressOuter}>
          <View style={[styles.progressInner, { width:`${percentage}%` }]} />
        </View>

        <View style={styles.amountDisplay}>
          <Text style={styles.currency}>₹</Text>
          <Text style={styles.amount}>{enteredAmount.toLocaleString()}</Text>
        </View>
      </View>

      <Text style={styles.limitText}>Available: ₹{availableAmount.toLocaleString()}</Text>

      <View style={styles.padContainer}>
        {dialPad.map((item, index) => (
          <TouchableOpacity key={index} style={styles.key} onPress={() => handlePress(item)}>
            <Text style={styles.keyText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.WithdrawButton}  onPress={handleWithdraw}>
        <Text style={styles.WithDrawButtonText}>Withdraw</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.PayButton}>
        <Text style={styles.PayButtonText}>Pay</Text>
+     </TouchableOpacity>
    </LinearGradient>
  );
};

export default TakeOrPayPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f4a97',
    marginBottom: 30,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressOuter: {
    width: 200,
    height: 12,
    backgroundColor: '#d1e3fa',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressInner: {
    height: '100%',
    backgroundColor: '#0f4a97',
  },
  amountDisplay: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  currency: {
    fontSize: 24,
    color: '#0f4a97',
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginLeft: 4,
  },
  limitText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  padContainer: {
    width: width - 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: 60,
    height: 60,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
  },
  keyText: {
    fontSize: 28,
    color: '#0f4a97',
    fontWeight: '500',
  },
  WithdrawButton: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  WithDrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },PayButton: {
        marginTop: 20,
        backgroundColor: '#FF5722',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
       shadowRadius: 3,
     },
     PayButtonText: {
        color: '#fff',
     fontSize: 16,
       fontWeight: 'bold',
       letterSpacing: 1,
      },
     });