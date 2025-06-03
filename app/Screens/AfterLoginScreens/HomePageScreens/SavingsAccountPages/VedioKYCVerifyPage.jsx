import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { ScrollView } from 'react-native';

const VedioKYCVerifyPage = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor:'white'}}>
    <SafeAreaView style={styles.container}>
      {/* Video Icon Header */}
      <View style={styles.iconContainer}>
        <Ionicons name="videocam" size={40} color="#0f4a97" />
      </View>

      {/* Heading and Subheading */}
      <Text style={styles.heading}>Video KYC Verification</Text>
      <Text style={styles.subheading}>Complete Your KYC Verification to Create Savings Account</Text>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Before you begin:</Text>
        
        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
          <Text style={styles.infoText}>Keep your PAN Card Ready</Text>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
          <Text style={styles.infoText}>Ensure good Lighting in your Room</Text>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
          <Text style={styles.infoText}>Find a quiet place for clear audio</Text>
        </View>
      </View>

      {/* Start Button */}
      <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('KYCStatus', { status: 'success' })}
>
  <Text style={styles.buttonText}>Start KYC Verification</Text>
</TouchableOpacity>


      <Text style={styles.note}>The verification process takes approximately 2-3 minutes.</Text>
    </SafeAreaView>
    </ScrollView>
  );
};

export default VedioKYCVerifyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: '40%',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f4a97',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  infoBox: {
    backgroundColor: '#e6effa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f4a97',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircle: {
    backgroundColor: '#0f4a97',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#0f4a97',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    textAlign: 'center',
    color: '#666',
    marginTop: 16,
    fontSize: 13,
  },
});
