import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const ActivityPage = ({navigation}) => {
  const [locationGranted, setLocationGranted] = useState(false);

  const [transactions, setTransactions] = useState([
    { id: '1', type: 'borrow', amount: 5000, date: '2025-04-10' },
    { id: '2', type: 'repayment', amount: 2000, date: '2025-04-12' },
    { id: '3', type: 'failed', amount: 3000, date: '2025-04-13' },
    { id: '4', type: 'borrow', amount: 7000, date: '2025-04-14' },
    { id: '5', type: 'repayment', amount: 5000, date: '2025-04-15' },
  ]);

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      setLocationGranted(true);
    } else {
      Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const getCardStyle = (type) => {
    switch (type) {
      case 'borrow': return styles.cardBorrow;
      case 'repayment': return styles.cardRepayment;
      case 'failed': return styles.cardFailed;
      default: return {};
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'borrow': return <FontAwesome5 name="hand-holding-usd" size={22} color="#2563eb" />;
      case 'repayment': return <MaterialIcons name="payments" size={24} color="#059669" />;
      case 'failed': return <Ionicons name="close-circle" size={24} color="#dc2626" />;
      default: return null;
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case 'borrow': return "Loan Taken";
      case 'repayment': return "Loan Paid";
      case 'failed': return "Failed Attempt";
      default: return "Unknown";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyBox}>
       

        <Text style={styles.heading}>Activity</Text>
        {!locationGranted && (
          <View style={styles.enableLocationInlineBox}>
            <Text style={styles.infoText}>Enable location to view more relevant activity data.</Text>
            <TouchableOpacity style={styles.allowButton} onPress={requestLocation}>
              <Text style={styles.allowText}>Allow Location</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('TransactionDetails', { transaction: item })}>
            <View style={[styles.transactionCard, getCardStyle(item.type)]}>
              <View style={styles.iconContainer}>{getIcon(item.type)}</View>
              <View style={styles.transactionText}>
                <Text style={styles.typeText}>{getLabel(item.type)}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <Text style={styles.amountText}>₹{item.amount}</Text>
            </View>
          </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivityPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  enableLocationInlineBox: {
    backgroundColor: '#e0f2fe',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#1e3a8a',
    marginBottom: 8,
    textAlign: 'center',
  },
  allowButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  allowText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  historyBox: {
    flex: 1,
  },
  heading: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1e293b',
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  cardBorrow: {
    borderLeftWidth: 5,
    borderLeftColor: '#60a5fa',
  },
  cardRepayment: {
    borderLeftWidth: 5,
    borderLeftColor: '#34d399',
  },
  cardFailed: {
    borderLeftWidth: 5,
    borderLeftColor: '#f87171',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  transactionText: {
    flex: 1,
    marginLeft: 10,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  dateText: {
    fontSize: 13,
    color: '#64748b',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
});
