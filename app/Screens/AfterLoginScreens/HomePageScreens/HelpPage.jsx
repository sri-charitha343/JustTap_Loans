import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HelpPage = () => {
  const navigation = useNavigation();

  const handleEmailSupport = () => {
    Linking.openURL('mailto:bhaskardavuluri8@gmail.com?subject=Need Help');
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:8340863204').catch(() => {
      Alert.alert("Unable to make a call", "Please check your phone dialer settings.");
    });
  };

 
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#0F4A97" />
      </TouchableOpacity>

      <Text style={styles.title}>Help & Support</Text>

      <View style={styles.iconRow}>
        <MaterialIcons name="pause-circle" size={20} color="#0F4A97" />
        <Text style={styles.subHeading}>Borrow on Hold</Text>
      </View>

      <View style={styles.iconRow}>
        <MaterialIcons name="account-balance-wallet" size={20} color="#0F4A97" />
        <Text style={styles.subHeading}>Savings Account and Deposits</Text>
      </View>

      <View style={styles.iconRow}>
        <MaterialIcons name="touch-app" size={20} color="#0F4A97" />
        <Text style={styles.subHeading}>Just Tap! Loans</Text>
      </View>

      <View style={styles.iconRow}>
        <MaterialIcons name="qr-code-scanner" size={20} color="#0F4A97" />
        <Text style={styles.subHeading}>UPI</Text>
      </View>

      <View style={styles.iconRow}>
        <MaterialIcons name="info" size={20} color="#0F4A97" />
        <Text style={styles.subHeading}>General</Text>
      </View>

      <View style={styles.iconRow}>
        <MaterialIcons name="report" size={20} color="#0F4A97" />
        <Text style={styles.subHeading}>Fraud</Text>
      </View>

      <Text style={styles.sectionTitle}>Need more help?</Text>

      <TouchableOpacity style={styles.contactButton} onPress={handleEmailSupport}>
        <MaterialIcons name="email" size={22} color="white" />
        <Text style={styles.contactButtonText}>Email Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.contactButton, { marginTop: 10 }]} onPress={handleCallSupport}>
        <MaterialIcons name="call" size={22} color="white" />
        <Text style={styles.contactButtonText}>Call Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HelpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 30,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F4A97',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F4A97',
    marginLeft: 10,
  },
  faqCard: {
    backgroundColor: '#f2f6ff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  answer: {
    fontSize: 14,
    color: '#555',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F4A97',
    padding: 14,
    borderRadius: 10,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
