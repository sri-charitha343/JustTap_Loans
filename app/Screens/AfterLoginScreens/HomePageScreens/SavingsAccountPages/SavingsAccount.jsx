import { SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

const benefits = [
  {
    icon: 'trending-up-outline',
    title: 'Unlock Higher Loan Limits',
    description:
      'Users with a savings account get access to increased loan eligibility, allowing them to borrow higher amounts based on their saving behavior.',
  },
  {
    icon: 'timer-outline',
    title: 'Priority Loan Approval',
    description:
      'Enjoy faster and priority loan processing for users with active savings accounts, reducing waiting times during urgent financial needs.',
  },
  {
    icon: 'cash-outline',
    title: 'Earn Interest While You Save',
    description:
      'Savings accounts earn daily/monthly interest, helping users grow their money while building a credit profile for future loan benefits.',
  },
];

const screenWidth = Dimensions.get('window').width;

const SavingsAccount = ({navigation}) => {
  const scrollRef = useRef();
  const scrollInterval = 1000;
  const boxWidth = screenWidth * 0.9 + 15;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % benefits.length;
      scrollRef.current?.scrollTo({ x: currentIndex * boxWidth, animated: true });
    }, scrollInterval);

    return () => clearInterval(interval);
  }, []);



  return (
    <ScrollView style={{backgroundColor: '#0d438b', }}>
      <View style={styles.container}>
      <Text style={styles.title}>Start your savings journey today.</Text>
      <Image source={require('../../../../../assets/Images/savingaccount2.png')} style={styles.image} />

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={{ marginTop: 20 }}
      >
        {benefits.map((item, index) => (
          <View key={index} style={styles.box}>
            <Ionicons name={item.icon} size={70} color="#0077b6" style={styles.icon} />
            <Text style={styles.boxTitle}>{item.title}</Text>
            <Text style={styles.boxDescription}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
     

      <Text style={styles.readyText}>Ready to save? Open your account</Text>

      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('PanNumberPage')}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SavingsAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    margin: 20,
    resizeMode: 'contain',
    height: 120,
    width: 170,
  },
  
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  box: {
    width: screenWidth * 0.9,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginRight: 15,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    marginBottom: 20,
  
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0077b6',
  },
  boxDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  readyText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    backgroundColor: '#0077b6',
    marginTop: 10,
    marginBottom: 20,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    
  },
});