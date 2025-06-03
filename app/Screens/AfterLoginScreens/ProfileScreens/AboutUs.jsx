import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AboutUs = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Terms')}>
        <Icon name="document-text" size={24} color="#0f4a97" style={styles.icon} />
        <Text style={styles.optionText}>Terms and Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Privacy')}>
        <Icon name="lock-closed" size={24} color="#0f4a97" style={styles.icon} />
        <Text style={styles.optionText}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Grievance')}>
        <Icon name="chatbox-ellipses" size={24} color="#0f4a97" style={styles.icon} />
        <Text style={styles.optionText}>Grievance Redressal Policy</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    color: '#1F2937',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
});
