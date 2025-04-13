import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

const ChooseAPlan = ({ navigation, route }) => {
    const loan = useSelector((state) => state.loan);
    console.log("loan details:", loan);

  const handleFullPayment = () => {
    navigation.navigate('PaymentPage', { 
      paymentType: 'full',
      amount: loan.totalWithdrawnAmount || loan.withdrawnAmount
    });
  };

  const handleCustomPayment = () => {
    navigation.navigate('PaymentPage', {
      paymentType: 'custom',
      amount: loan.emiThisMonth
    });
  };

  return (
    <LinearGradient colors={['#e3f2fd', '#ffffff']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose a Payment Plan</Text>
        
        {/* Full Payment Box */}
        <TouchableOpacity style={styles.paymentBox} onPress={handleFullPayment}>
          <View style={styles.paymentBoxLeft}>
            <Text style={styles.paymentTitle}>Full Payment</Text>
            <Text style={styles.paymentSubtitle}>Total repayment: ₹{ loan.withdrawnAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.paymentBoxRight}>
            <Text style={styles.noInterestText}>😃No Interest</Text>
          </View>
        </TouchableOpacity>

        {/* Custom Payment Box */}
        <TouchableOpacity style={styles.paymentBox} onPress={handleCustomPayment}>
          <View style={styles.paymentBoxLeft}>
            <Text style={styles.paymentTitle}>Custom Payment</Text>
            <Text style={styles.paymentSubtitle}>EMI this month: ₹{loan.emiThisMonth.toLocaleString()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginBottom: 30,
    textAlign: 'center',
  },
  paymentBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentBoxLeft: {
    flex: 1,
  },
  paymentBoxRight: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f4a97',
    marginBottom: 5,
  },
  paymentSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  noInterestText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ChooseAPlan;
