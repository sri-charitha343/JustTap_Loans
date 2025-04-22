import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const LoansPage = ({ route }) => {
  const { showInfo } = route.params || { showInfo: false }; // Retrieve showInfo from navigation params
  const navigation = useNavigation();
const categorySelected = useSelector((state) => state.selectedCategory)
 console.log('Category Selected:', categorySelected);
  const loanAmountRef = useRef(500);
  const userType = useSelector((state) => state.userType);
  console.log('User Type:', userType);
  const loan = useSelector((state) => state.loan);
  console.log('Loan:', loan);
  const dispatch = useDispatch();

  const formattedDate = moment().add(30, 'days').format('DD/MM/YYYY');

  const handleGetMoney = () => {
    dispatch({
      type: 'SET_LOAN_TAKEN',
      payload: {
        isTaken: true,
        amount: loan.amount,
        term: 30,
        repaymentDate: formattedDate,
      },
    });
    navigation.navigate('UserDetailsPage');
  };

 

  const borrowingsHistory = loan?.history || [
    { amount: 5000, date: '17/03/2025' },
    { amount: 3000, date: '25/02/2025' },
  ];

  if (loan?.isTaken) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loanCard}>
          <Text style={styles.loanActiveText}>🎯 Active Loan Summary</Text>
          <>
            {loan?.withdrawnAmount > 0 ? (
              <Text style={styles.loanActiveText}>
                ₹{loan.remainingAvailableAmount?.toLocaleString()}
              </Text>
            ) : (
              <Text style={styles.loanAmount}>
                ₹{loan.amount}
              </Text>
            )}
          </>

          <View style={styles.loanInfoContainer}>
            <View style={styles.loanInfoBox}>
              <Text style={styles.loanInfoLabel}>Due Date</Text>
              <Text style={styles.loanInfoValue}>{loan.repaymentDate}</Text>
            </View>
            <View style={styles.loanInfoBox}>
              <Text style={styles.loanInfoLabel}>Term</Text>
              <Text style={styles.loanInfoValue}>{loan.term} days</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.takeAmountBtn}
            onPress={() => navigation.navigate('TakeOrPayPage')}
          >
            <Text style={styles.takeAmountText}>+ Take More Amount</Text>
          </TouchableOpacity>

          {loan?.withdrawnAmount > 0 && (
            <View>
              <Text style={styles.repaymentTitle}>💳 Repayment Details</Text>
              <View style={styles.repaymentBox}>
                <View style={styles.repaymentLeft}>
                  <Text style={styles.repaymentAmount}>
                    Amount: ₹{loan.withdrawnAmount?.toLocaleString()}
                  </Text>
                  <Text style={styles.emiAmount}>
                    EMI This Month: ₹{loan.emiThisMonth?.toLocaleString()}
                  </Text>
                  <Text style={styles.repaymentDate}>Due: {loan.repaymentDate}</Text>
                </View>
                <TouchableOpacity
                  style={styles.payNowButton}
                  onPress={() => navigation.navigate('ChooseAPlan')}
                >
                  <Text style={styles.payNowText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
        </View>

        {loan?.withdrawnAmount > 0 && (
        <View style={{ marginTop: 30, width: '100%' }}>
          <Text style={styles.activeBorrowingTitle}>📜Your Loan Trail</Text>
          {borrowingsHistory.length === 0 ? (
            <Text style={styles.noHistoryText}>No borrowings yet.</Text>
          ) : (
            borrowingsHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyAmount}>₹{item.amount.toLocaleString()}</Text>
                <Text style={styles.historyDate}>Date: {item.date}</Text>
              </View>
            ))
          )}
        </View>
        )}

        
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Get Your Loan</Text>


      {loan.selectedCategory && (
        <>
          <Text style={styles.infoHeading}>You're eligible for:</Text>
          <Text style={styles.eligibleAmount}>
            {categorySelected === 'self-employed'
              ? '₹10,000 - ₹20,000'
              : `₹${loan.amount.toLocaleString()}`}
          </Text>
          <Text style={styles.repaymentText}>
            Repayment date will be every month on the 5th.
          </Text>
          <Text style={styles.noteText}>
            *NOTE: According to your CIBIL score, you will get an amount up to your eligible limit.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleGetMoney}>
            <Text style={styles.buttonText}>Get Money</Text>
          </TouchableOpacity>
        </>
      )}
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
    textAlign: 'center',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categoryContainer: {
    width: '100%',
    gap: 12,
  },
  categoryBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  selectedCategory: {
    borderColor: '#0f4a97',
    backgroundColor: '#e3ecf8',
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#333',
  },
  noteText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#0f4a97',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
  },
  infoHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginBottom: 10,
  },
  eligibleAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff4500',
    marginBottom: 15,
  },
  repaymentText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ff4500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loanCard: {
    backgroundColor: '#f4f8ff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    marginTop: 10,
  },
  loanActiveText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f4a97',
    textAlign: 'center',
    marginBottom: 10,
  },
  loanAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  loanInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  loanInfoBox: {
    alignItems: 'center',
  },
  loanInfoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  loanInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f4a97',
  },
  takeAmountBtn: {
    marginTop: 25,
    backgroundColor: '#0f4a97',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'center',
    shadowColor: '#0f4a97',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  takeAmountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  repaymentBox: {
    marginTop: 5,
    backgroundColor: '#0f4a97',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  repaymentLeft: {
    flex: 1,
  },
  repaymentTitle: {
    fontSize: 16,
    color: '#0f4a97',
    fontWeight: 'bold',
    marginTop: 30,
  },
  repaymentAmount: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  repaymentDate: {
    fontSize: 14,
    color: '#fff',
  },
  payNowButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  payNowText: {
    color: '#0f4a97',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emiAmount: {
    color: '#fff',
  },
  activeBorrowingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginBottom: 10,
    textAlign: 'center',
  },
  noHistoryText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: 'center',
  },
  historyAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  historyDate: {
    fontSize: 14,
    color: '#555',
  },
});
