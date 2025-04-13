import { ScrollView, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import DiffLoans from '../../Customer/DiffLoans';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';



const HomePage = () => {


  const profileImage = useSelector(state => state.profileImage);
  const navigation = useNavigation();
  const userType = useSelector((state) => state.userType);
  const loan = useSelector((state) => state.loan);
  console.log("loan details:", loan);
  console.log("user type:", userType);
  const handleProfilePress = () => {
    navigation.navigate('ProfilePage');
  };

  React.useEffect(() => {
    if (loan?.isTaken) {
      navigation.navigate('TakeOrPayPage');
    }
  }, [loan?.isTaken]);

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
        <View>
          <Text style={styles.loanActiveText}>Your active loan</Text>
          <Text style={styles.loanAmount}>₹{loan.activeAmount || loan.amount}</Text>
          <View style={styles.loanInfoRow}>
            <Text style={styles.loanDuration}>Due Date: {loan.repaymentDate}</Text>
            <Text style={styles.loanDuration}>Days: {loan.term}</Text>
          </View>

          <View style={styles.loanActionsContainer}>
            <TouchableOpacity 
              style={styles.TakeAmountButton} 
              onPress={() => navigation.navigate('TakeOrPayPage')}
            >
              <Text style={styles.TakeAmountBtnText}>Take Amount</Text>
            </TouchableOpacity>
            
            {loan.activeAmount > 0 && (
              <View style={styles.paymentBox}>
                <Text style={styles.paymentText}>Amount to Pay: ₹{loan.activeAmount}</Text>
                <TouchableOpacity style={styles.payCircleButton}>
                  <Text style={styles.payButtonText}>Pay</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ) : userType === 'customer' ? (
        <View>
          <DiffLoans />
        </View>
      ) : (

        <View style={styles.driverContent}>
          <Text style={styles.text}>Welcome, Driver</Text>

        </View>
      )}


      <View style={styles.bottomcontainer}>
        <View style={styles.inrow}>
          <View styles={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: 20,
          }}>
            <TouchableOpacity
              style={[styles.overview, !loan?.isTaken && styles.disabledBox]}
              onPress={() => loan?.isTaken && navigation.navigate('OverView')}
              disabled={!loan?.isTaken}
            >
              <Icon name="piechart" size={40} color={loan?.isTaken ? "white" : "#aaa"} />
            </TouchableOpacity>

            <Text style={[styles.overviewText, !loan?.isTaken && styles.disabledText]}>Overview</Text>
          </View>
          <View styles={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: 20,
          }}>
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
  driverText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
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
    borderRadius: 10
  },
  overview: {
    backgroundColor: '#0f4a97',
    height: 100,
    width: 140,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  overviewText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  friendsText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  driverContent: {
    marginVertical: 20,
    alignItems: 'center',
  },
  driverButton: {
    backgroundColor: '#0F4A97',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  driverButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loanActiveText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0f4a97',
    textAlign: 'center',
    marginVertical: 10,
  },
  loanAmount: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TakeAmountButton: {
    margin: 20,
    backgroundColor: '#0F4A97',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  TakeAmountBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledBox: {
    backgroundColor: '#e0e0e0',
  },
  disabledText: {
    color: '#aaa',
  },
  loanInfoRow: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  
  loanDuration: {
    fontSize: 13,
    color: '#333', 
    marginVertical: 0,
    fontWeight: '500',
  },
  loanActionsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  paymentBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  payButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loanActionsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  paymentBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  payButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loanActionsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  paymentBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  payCircleButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  }
  
});
