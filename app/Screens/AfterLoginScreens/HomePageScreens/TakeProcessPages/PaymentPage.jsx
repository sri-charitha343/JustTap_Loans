import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PaymentPage = ({ navigation }) => {
  const handlePaymentSelect = (method) => {
    Alert.alert('Payment Successful', `You selected ${method.toUpperCase()} method`, [
      { text: 'OK', onPress: () => navigation.navigate('MainTabs') },
    ]);
  };

  return (
    <LinearGradient colors={['#e3f2fd', '#ffffff']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Payment Method</Text>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => handlePaymentSelect('upi')}
        >
          <Text style={styles.paymentText}>UPI Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => handlePaymentSelect('card')}
        >
          <Text style={styles.paymentText}>Debit/Credit Card</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  content: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0f4a97', marginBottom: 30, textAlign: 'center' },
  paymentOption: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentText: { fontSize: 18, color: '#0f4a97', textAlign: 'center' },
});

export default PaymentPage;
