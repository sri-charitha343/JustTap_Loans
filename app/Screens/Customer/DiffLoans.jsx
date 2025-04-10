import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const DiffLoans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const userData = useSelector(state => state.userData);
  const displayName = userData ? userData.name : 'User';
  const navigation = useNavigation();
  const loanOptions = [
    { id: 1, name: 'Personal Loan', description: 'Higher credit limit', price: '₹5,000 - ₹50,000', icon: 'person-outline', color: '#fca5a5' },
    { id: 2, name: 'Easy Loan', description: 'Instant Transfer', price: '₹500 - ₹5,000', icon: 'flash-outline', color: '#fcd34d' },
    { id: 3, name: 'Business Loan', description: 'For business owners', price: '₹10,000 - ₹100,000', icon: 'briefcase-outline', color: '#6ee7b7' }
  ];
  const resetSelection = () => {
    setSelectedLoan(null);
    navigation.navigate('LoansPage'); 
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {displayName}</Text>
      <Text style={styles.loanAmountLabel}>Get Loan Upto</Text>
      <Text style={styles.loanAmount}>₹3,00,000</Text>
      <Text style={styles.subText}>Choose a loan category that best suits your needs.</Text>

      <View style={styles.loanContainer}>
        {loanOptions.map((loan) => {
          const isSelected = selectedLoan === loan.id;
          return (
            <TouchableOpacity
              key={loan.id}
              style={[styles.loanBox, { backgroundColor: isSelected ? loan.color : '#fff' }]}
              onPress={() => setSelectedLoan(loan.id)}>
                
              <Ionicons 
                name={loan.icon} 
                size={30} 
                color={isSelected ? '#fff' : loan.color} 
                style={styles.loanIcon} 
              />
              <View style={styles.loanTextContainer}>
                <Text style={[styles.loanText, { color: isSelected ? '#fff' : '#333' }]}>{loan.name}</Text>
                <Text style={[styles.loanDescription, { color: isSelected ? '#fff' : '#666' }]}>{loan.description}</Text>
              </View>
              <Text style={[styles.loanPrice, { color: isSelected ? '#fff' : '#000' }]}>{loan.price}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Show Next Button Only When a Loan is Selected */}
      {selectedLoan && (
        <View style={{flexDirection:'row' , width:'100%',justifyContent:'space-around',paddingHorzontal: 10}}>
        <TouchableOpacity
        style={[styles.nextButton, !selectedLoan && styles.disabledButton]}
        onPress={() => selectedLoan && navigation.navigate('Loans', { loanType: selectedLoan })}
        disabled={!selectedLoan}
      >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.nextButton}
            onPress={resetSelection}
          >
            <Text style={styles.nextButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        
      )}   
    </SafeAreaView>
  );
};

export default DiffLoans;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
    height: 430,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    marginTop: -100,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  loanAmountLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  loanAmount: {
    fontSize: 20,
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
  loanContainer: {
    width: '100%',
    height: 120,
  },
  loanBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },
  loanIcon: {
    marginLeft: 5,
  },
  loanTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  loanText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  loanDescription: {
    fontSize: 10,
  },
  loanPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: -3,
  },
  nextButton: {
    top: 85,
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '40%',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
