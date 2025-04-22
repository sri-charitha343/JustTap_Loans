import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DiffLoans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const userData = useSelector(state => state.userData);
  const displayName = userData ? userData.name : 'User';
  const navigation = useNavigation();

  const loanOptions = [
    { id: 1, name: 'Personal Loan', description: 'Higher credit limit', price: '₹5,000 - ₹50,000', icon: 'person-outline', color: '#FF6B6B' },
    { id: 2, name: 'Easy Loan', description: 'Instant Transfer', price: '₹500 - ₹5,000', icon: 'flash-outline', color: '#FFD93D' },
    { id: 3, name: 'Business Loan', description: 'For business owners', price: '₹10,000 - ₹100,000', icon: 'briefcase-outline', color: '#6BCB77' }
  ];

  const resetSelection = () => {
    setSelectedLoan(null);
    // Clear any existing navigation params
    navigation.setParams({ loanType: undefined });
  };

  const renderLoanCard = ({ item }) => {
    const isSelected = selectedLoan === item.id;
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: isSelected ? item.color : 'rgba(255,255,255,0.1)', borderColor: isSelected ? item.color : '#ccc' }]}
        onPress={() => setSelectedLoan(item.id)}
        activeOpacity={0.9}
      >
        <Ionicons name={item.icon} size={40} color={isSelected ? '#fff' : item.color} style={{ marginBottom: 10 }} />
        <Text style={[styles.cardTitle, { color: isSelected ? '#fff' : '#333' }]}>{item.name}</Text>
        <Text style={[styles.cardDesc, { color: isSelected ? '#fff' : '#666' }]}>{item.description}</Text>
        <Text style={[styles.cardPrice, { color: isSelected ? '#fff' : '#111' }]}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {displayName}</Text>
      <Text style={styles.loanAmountLabel}>Get Loan Upto</Text>
      <Text style={styles.loanAmount}>₹3,00,000</Text>
      <Text style={styles.subText}>Choose a loan category that best suits your needs.</Text>

      <FlatList
        data={loanOptions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderLoanCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {selectedLoan && (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.fabButton} onPress={() => navigation.navigate('Draw', { loanType: selectedLoan })}>
            <Ionicons name="arrow-forward" size={22} color="#fff" />
            <Text style={styles.fabText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fabButton, { backgroundColor: '#333' }]} onPress={resetSelection}>
            <Ionicons name="refresh" size={22} color="#fff" />
            <Text style={styles.fabText}>Reset</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DiffLoans;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    textAlign:'center',
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  loanAmountLabel: {
    fontSize: 15,
    textAlign:'center',
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  loanAmount: {
    fontSize: 20,
    textAlign:'center',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
  },
  subText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  limitLabel: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  limitAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 5,
  },
  chooseLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 10,
    color: '#333',
  },
  card: {
    width: width * 0.5,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 13,
    marginVertical: 5,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  fabButton: {
    flexDirection: 'row',
    backgroundColor: '#0F4A97',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    gap: 8,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
