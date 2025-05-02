import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const AutoPaySetUp = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>🔁 PayFlow Activation</Text>
        <Text style={styles.description}>Set up AutoPay to make your payments automatically.</Text>
        <Text style={styles.description}>AutoPay is a free service that automatically deducts your payment from your bank account on the due date.</Text>

        <View style={styles.section}>
          <View style={styles.headingRow}>
            <Ionicons name="card-outline" size={20} color="#555" />
            <Text style={styles.heading}> Next Payment</Text>
          </View>
          <Text style={styles.nextPaymentValue}>₹ 1,500.00</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.headingRow}>
            <MaterialIcons name="event-note" size={20} color="#555" />
            <Text style={styles.heading}> Due Date</Text>
          </View>
          <Text style={styles.dueDateValue}>May 5, 2025</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.continueBtn}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AutoPaySetUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#F5F9FF',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
    backgroundColor: '#0f4a97',
    padding: 10,
    borderRadius: 7,
  },
  content: {
    marginTop: '50%',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  section: {
    marginTop: 30,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 5,
  },
  nextPaymentValue: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 5,
    color: '#007BFF',
    backgroundColor: '#E6F7FF',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dueDateValue: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 5,
    color: '#FF6F61',
    backgroundColor: '#FFF4E5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  continueBtn: {
    backgroundColor: '#0f4a97',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
