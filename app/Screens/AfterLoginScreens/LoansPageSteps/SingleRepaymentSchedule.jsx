import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import React from 'react';
import moment from 'moment';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const SingleRepaymentSchedule = ({ route }) => {
  const { item } = route.params || {};
  console.log('Single Repayment Schedule Item:', item);

  const startDate = moment(item.date, 'MMMM D, YYYY');
  const totalAmount = parseFloat(item.amount.replace(/[^\d]/g, ''));
  const emiCount = item.emi;
  const annualInterestRate = item.interestRate || 12;
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  const emiAmount = totalAmount / item.emi;
    console.log('EMI Amount:', emiAmount);
  let balance = totalAmount;

  const emiSchedule = Array.from({ length: emiCount }, (_, index) => {
    const interest = balance * monthlyInterestRate;
    const principal = emiAmount - interest;
    const dueDate = startDate.clone().add(index + 1, 'months').format('DD MMM YYYY');

    const scheduleItem = {
      id: index + 1,
      dueDate,
      emiAmount,
      principal,
      interest,
    };

    balance -= principal;
    return scheduleItem;
  });

  return (
    <LinearGradient colors={['#e3f2fd', '#bbdefb']} style={styles.container}>
      <Text style={styles.heading}>Repayment Schedule</Text>
      <FlatList
        data={emiSchedule}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BlurView intensity={30} tint="light" style={styles.card}>
            <Text style={styles.label}>Due Date: <Text style={styles.value}>{item.dueDate}</Text></Text>
            <Text style={styles.label}>Amount: <Text style={styles.value}>₹ {item.emiAmount.toFixed(2)}</Text></Text>
            <Text style={styles.label}>Principal Paid: <Text style={styles.value}>₹ {item.principal.toFixed(2)}</Text></Text>
            <Text style={styles.label}>Interest: <Text style={styles.value}>₹ {item.interest.toFixed(2)}</Text></Text>
          </BlurView>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </LinearGradient>
  );
};

export default SingleRepaymentSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1565c0',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  card: {
    width: width - 32,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: '#90caf9',
  },
  label: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },
  value: {
    color: '#000',
    fontWeight: '600',
  },
});
