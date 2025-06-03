import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const LoansPage = ({ route }) => {
  const { showInfo } = route.params || { showInfo: false };
  const navigation = useNavigation();
  const categorySelected = useSelector((state) => state.selectedCategory);
  const loanAmountRef = useRef(500);
  const userType = useSelector((state) => state.userType);
  const loan = useSelector((state) => state.loan);
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
    { amount: 3000, date: '15/05/2025' },
    { amount: 2000, date: '10/06/2025' },
  ];

  if (loan?.isTaken) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <BlurView intensity={60} tint="light" style={styles.loanCard}>
            <Text style={styles.loanActiveText}>Active Loan Summary</Text>
            {loan?.withdrawnAmount > 0 ? (
              <Text style={styles.loanActiveText}>
                ₹{loan.remainingAvailableAmount?.toLocaleString()}
              </Text>
            ) : (
              <Text style={styles.loanAmount}>₹{loan.amount}</Text>
            )}

             {userType === 'customer' || userType === 'new' ? (
                          <>
            
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
                       </>
                        ) : null}

            <TouchableOpacity
              style={styles.takeAmountBtn}
              onPress={() => navigation.navigate('TakeOrPayPage')}
            >
              <Text style={styles.takeAmountText}>+ Take More Amount</Text>
            </TouchableOpacity>
          </BlurView>
          {loan?.withdrawnAmount > 0 && (
            <View style={styles.repaymentContainer}>
              <Text style={styles.repaymentTitle}>💳 Repayment Details</Text>
              <LinearGradient
                colors={['#0f4a97', '#0c2f66']}
                style={styles.repaymentBox}
              >
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
              </LinearGradient>
            </View>
          )}
          {loan?.withdrawnAmount > 0 && (
            <View style={{ marginTop: 30, width: '100%' }}>
              <Text style={styles.activeBorrowingTitle}>📜 Your Loan Trail</Text>
              {borrowingsHistory.length === 0 ? (
                <Text style={styles.noHistoryText}>No borrowings yet.</Text>
              ) : (
                borrowingsHistory.map((item, index) => (
                  <View key={index} style={styles.historyItem}>
                    <Text style={{fontSize:12,color:'grey'}}>•Withdrawn</Text>
                    <Text style={styles.historyAmount}>₹{item.amount.toLocaleString()}</Text>
                    <Text style={styles.historyDate}>Date: {item.date}</Text>
                    
                  </View>
                ))
              )}
              <TouchableOpacity style={styles.viewMoreButton} onPress={() => navigation.navigate('BorrowingsHistory')}>
                    <Text style={styles.viewMoreButtonText}>View More</Text>
                  </TouchableOpacity>
            </View>
          )}
          <View style={styles.featureOptionsContainer}>
            <TouchableOpacity style={styles.featureCard} onPress = {() => navigation.navigate('AutoPaySetUp')}>
              <Text style={styles.featureEmoji}>🔁</Text>
              <Text style={styles.featureTitle}>PayFlow Activation</Text>
              <Text style={styles.featureDescription}>
                Automate your monthly payments and stay stress-free!
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard} onPress = {() => navigation.navigate('RepaymentSchedule')}>
              <Text style={styles.featureEmoji}>⏳</Text>
              <Text style={styles.featureTitle}>Repay Rhythm</Text>
              <Text style={styles.featureDescription}>
                You Can Check Your Repayment Schedule and Plan Your Payments
              </Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
        <Text style={styles.title}>Get Your Loan</Text>

        {loan.selectedCategory && (
          <>
            <Text style={styles.infoHeading}>You're eligible for:</Text>
            <Text style={styles.eligibleAmount}>
              {categorySelected === 'self-employed'
                ? '₹10,000 - ₹20,000'
                : `₹${loan.amount.toLocaleString()}`}
            </Text>
            {userType === 'driver' ?(
              <>
              <Text style={styles.repaymentText}>
              You Can Repay the Amount Everyday from Your Earnings by Driving
            </Text>
              </>
            ):(<>
            <Text style={styles.repaymentText}>
              Repayment date will be every month on the 5th.
            </Text>
             </>)}
            <Text style={styles.noteText}>
              *NOTE: Your eligible limit, as per your CIBIL score, defines the maximum loan you can receive.
            </Text>
           
            
            <TouchableOpacity style={styles.button} onPress={handleGetMoney}>
              <Text style={styles.buttonText}>Get Money</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoansPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: '50%',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginBottom: 10,
    textAlign: 'center',
  },
  eligibleAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff4500',
    marginBottom: 15,
    textAlign: 'center',
  },
  repaymentContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  repaymentText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  noteText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ff4500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loanCard: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginTop: 50,
    marginHorizontal: 15,
    borderRadius: 20,
    padding: 20,
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
    justifyContent: 'space-around',
    marginTop: 20,
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
  },
  takeAmountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  repaymentBox: {
    marginTop: 5,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  repaymentLeft: {
    flex: 1,
  },
  repaymentTitle: {
    fontSize: 20,
    color: '#0f4a97',
    fontWeight: 'bold',
    marginTop: 20,
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
    backgroundColor: '#fff',
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
    fontSize: 14,
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
    backgroundColor: '#ffffffcc',
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 30,
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
  featureOptionsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  featureCard: {
    backgroundColor: '#ffffffdd',
    borderRadius: 20,
    padding: 15,
    width: '45%',
    alignItems: 'center',
  
  },
  featureEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f4a97',
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 13,
    textAlign: 'center',
    color: '#555',
    marginTop: 5,
  },
  viewMoreButton: {
    backgroundColor: '#0f4a97',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
    alignSelf: 'center',
  },
  viewMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
});
