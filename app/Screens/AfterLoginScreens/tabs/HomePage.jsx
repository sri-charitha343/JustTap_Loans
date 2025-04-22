import { ScrollView, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import DiffLoans from '../../Customer/DiffLoans';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const profileImage = useSelector(state => state.profileImage);
  const navigation = useNavigation();
  const userData = useSelector(state => state.userData);
  console.log("user data:", userData);
  const userType = useSelector((state) => state.userType);
  const loan = useSelector((state) => state.loan);
  console.log("loan details:", loan);
  console.log("user type:", userType);

  const handleProfilePress = () => {
    navigation.navigate('ProfilePage');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={30} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('HelpPage')}>
          <MaterialIcons name="support-agent" size={45} color="#0F4A97" right={0} />
        </TouchableOpacity>
      </View>

      {loan?.isTaken ? (
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

          <TouchableOpacity style={styles.takeAmountBtn} onPress={() => navigation.navigate('TakeOrPayPage')}>
            <Text style={styles.takeAmountText}>+ Take More Amount</Text>
          </TouchableOpacity>

          {loan?.withdrawnAmount > 0 && (
            <View>
              <Text style={styles.repaymentTitle}>💳 Repayment Details</Text>
              <View style={styles.repaymentBox}>

                <View style={styles.repaymentLeft}>
                  <Text style={styles.repaymentAmount}>Amount: ₹{loan.withdrawnAmount?.toLocaleString()}</Text>
                  <Text style={styles.emiAmount}>EMI This Month: ₹{loan.emiThisMonth?.toLocaleString()}</Text>
                  <Text style={styles.repaymentDate}>Due: {loan.repaymentDate}</Text>
                </View>
                <TouchableOpacity style={styles.payNowButton} onPress={() => navigation.navigate('ChooseAPlan')}>
                  <Text style={styles.payNowText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ) : userType === 'customer' ? (
        <View>
          <DiffLoans />
        </View>
      ) : (
        <View style={styles.driverContent}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.welcomeText}>{userData.name}!</Text>
          <Text style={styles.subText}>You are eligible for a loan up to</Text>
          <Text style={styles.loanAmountText}>
            <Text style={styles.upToText}>UPTO </Text>
            <Text style={styles.amountText}>₹{loan.amount}</Text>
          </Text>

          <TouchableOpacity style={styles.loanButton} onPress={() => navigation.navigate('Loans')}>
            <Text style={styles.buttonText}>Get Your Loan!</Text>
          </TouchableOpacity>
        </View>

      )}

      <View style={styles.bottomcontainer}>
        <View style={styles.inrow}>
          <View style={styles.overviewItem}>
            <TouchableOpacity
              style={[styles.overview, !loan?.isTaken && styles.disabledBox]}
              onPress={() => loan?.isTaken && navigation.navigate('OverView')}
              disabled={!loan?.isTaken}
            >
              <Icon name="piechart" size={40} color={loan?.isTaken ? "white" : "#aaa"} />
            </TouchableOpacity>
            <Text style={[styles.overviewText, !loan?.isTaken && styles.disabledText]}>Overview</Text>
          </View>

          <View style={styles.overviewItem}>
            <TouchableOpacity
              style={[styles.overview, !loan?.isTaken && styles.disabledBox]}
              onPress={() => loan?.isTaken && navigation.navigate('Cards')}
              disabled={!loan?.isTaken}
            >
              <Icon name="creditcard" size={40} color={loan?.isTaken ? "white" : "#aaa"} />
            </TouchableOpacity>
            <Text style={[styles.overviewText, !loan?.isTaken && styles.disabledText]}>Cards</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.friends} onPress={() => navigation.navigate('InviteFriends')}>
          <Text style={styles.friendsText}>Invite Friends get bonus</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 35,
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconContainer: {
    backgroundColor: '#0F4A97',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderColor: '#0F4A97',
    borderWidth: 3,
  },
  bottomcontainer: {
    padding: 15,
    borderRadius: 15,
  },
  friends: {
    backgroundColor: '#0f4a97',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  overview: {
    backgroundColor: '#0f4a97',
    height: 100,
    width: 140,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  inrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  overviewText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  friendsText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  driverContent: {
    width: '100%',
    alignItems: 'center',
  },
  disabledBox: {
    backgroundColor: '#e0e0e0',
  },
  disabledText: {
    color: '#aaa',
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
  driverContent: {
    backgroundColor: '#f5f9ff',
    padding: 20,
    borderRadius: 16,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#0f4a97',
    marginBottom: 6,
    
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  amountText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginVertical: 10,
  },
  loanButton: {
    marginTop: 15,
    backgroundColor: '#0f4a97',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  upToText: {
    fontSize: 25,
    color: '#000', 
  },
});
