import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const UPIPayments = () => {
    const loan = useSelector((state) => state.loan);
      console.log("loan details:", loan);
  const navigation = useNavigation();
  const route = useRoute();

  
  
  const upiMethods = [
    { name: 'GPay', uri: `tez://upi/pay?pa=yourupi@bank&pn=YourName&mc=&tid=&tr=&tn=Payment&am=${loan.withdrawnAmount}&cu=INR`, image: require('../../../../../assets/Images/gpay.png') },
    { name: 'Paytm', uri: `paytmmp://pay?pa=yourupi@bank&pn=YourName&mc=&tid=&tr=&tn=Payment&am=${loan.withdrawnAmount}&cu=INR`, image: require('../../../../../assets/Images/Paytm.png') },
    { name: 'PhonePe', uri: `phonepe://upi/pay?pa=yourupi@bank&pn=YourName&mc=&tid=&tr=&tn=Payment&am=${loan.withdrawnAmount}&cu=INR`, image: require('../../../../../assets/Images/phonepe.png') },
  ];


  const handleSelectMethod = (method) => {
    Linking.canOpenURL(method.uri).then((supported) => {
      if (supported) {
        Linking.openURL(method.uri);
      } else {
        Alert.alert('App Not Found', `Please install ${method.name} to continue.`);
      }
    });
  };

  return (
    <View style={styles.container}>
     <Text style={styles.title}>Select a UPI Method</Text>
      <View style={styles.methodContainer}>
        {upiMethods.map((method, index) => (
          <TouchableOpacity key={index} style={styles.method} onPress={() => handleSelectMethod(method)}>
            <Image source={method.image} style={styles.methodImage} resizeMode="contain" />
            <Text style={styles.methodText}>{method.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.stepsTitle}>Steps to Add Money</Text>
      <View style={styles.stepsContainer}>
        <Text style={styles.step}>1. Select a UPI Method</Text>
        <Text style={styles.step}>2. Go to Respective UPI App</Text>
        <Text style={styles.step}>3. Complete the payment</Text>
        <Text style={styles.step}>4. Come Back and check the status</Text>
      </View>
    </View>
  );
};

export default UPIPayments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  methodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    flexWrap: 'wrap', 
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  method: {
    alignItems: 'center',
    marginHorizontal: 20, 
    marginVertical: 20,
  },
  methodImage: {
    width: 80, 
    height: 80,
    borderRadius: 40, 
  },
  methodText: {
    marginTop: 5,
    fontSize: 16,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepsContainer: {
    alignItems: 'flex-start',
  },
  step: {
    fontSize: 16,
    marginVertical: 5,
  },
});
