import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BorrowingsHistory = () => {
  const [activeTab, setActiveTab] = useState('active');
  const navigation = useNavigation();
  const activeBorrowings = [
    { amount: '₹3,000', date: 'May 15, 2025', status: 'Active',emi: 3} ,
    { amount: '₹2,000', date: 'June 10, 2025', status: 'Active', emi: 3 },
    { amount: '₹6,000', date: 'May 10, 2025', status: 'Active',emi: 6 },
  ];



  const renderBorrowingItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BorrowingDetails', { item })}
    >
      <Text style={{ fontSize: 15, color: 'blue' }}>•Withdrawn</Text>
      <Text style={styles.amount}>{item.amount}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Your Loan Trail</Text>


        <View style={styles.list}>
          {(activeTab === 'active' ? activeBorrowings : closedBorrowings).map(renderBorrowingItem)}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  tabButton: {
    paddingVertical: 12,
    marginRight: 24,
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#0f4a97',
  },
  activeTabText: {
    color: '#0f4a97',
  },
  list: {
    gap: 12,
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  amount: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1f2937',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
  },
  
});

export default BorrowingsHistory;
