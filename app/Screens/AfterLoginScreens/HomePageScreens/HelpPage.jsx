import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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

  const faqs = [
    {
      question: 'How can I reset my password?',
      answer: 'Go to Profile > Settings > Change Password.',
    },
    {
      question: 'How do I check my account balance?',
      answer: 'Use the "Check Balance" button on the homepage.',
    },
    {
      question: 'How do I add a new bank account?',
      answer: 'Click on "Check Balance" and then tap "+ Add Bank Details".',
    },
    {
      question: 'How can I contact support?',
      answer: 'You can email us or call us using the buttons below.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Help & Support</Text>

      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqCard}>
          <Text style={styles.question}>Q: {faq.question}</Text>
          <Text style={styles.answer}>A: {faq.answer}</Text>
        </View>
      ))}

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
  },
  backButton: {
    position: 'absolute',
    backgroundColor:'#0f4a97',
    padding:10,
    marginTop:15,
    borderRadius:10
  },
  title: {
    marginTop: '30%',
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
