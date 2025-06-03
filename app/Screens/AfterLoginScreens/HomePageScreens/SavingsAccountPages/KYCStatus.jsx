import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const KYCStatusPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { status } = route.params;

  useEffect(() => {
    if (status === 'success') {
      const timeout = setTimeout(() => {
        navigation.replace('YourSavingsAccount'); 
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [status]);

  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <View style={styles.statusContainer}>
            <View style={[styles.iconCircle, { backgroundColor: 'green' }]}>
              <Ionicons name="checkmark" size={32} color="#fff" />
            </View>
            <Text style={styles.statusTitle}>Verified Successfully</Text>
            <Text style={styles.statusMessage}>
              Your KYC process has been completed successfully.
            </Text>
            <Text style={styles.redirecting}>Redirecting...</Text>
          </View>
        );
      case 'failure':
        return (
          <View style={styles.statusContainer}>
            <View style={[styles.iconCircle, { backgroundColor: '#cc0000' }]}>
              <Ionicons name="close" size={32} color="#fff" />
            </View>
            <Text style={styles.statusTitle}>Verification Failed</Text>
            <Text style={styles.statusMessage}>
              Sorry, we encountered some problems with your KYC verification. Please try again later.
            </Text>
          </View>
        );
      case 'processing':
        return (
          <View style={styles.statusContainer}>
            <ActivityIndicator size="large" color="#0f4a97" />
            <Text style={styles.statusTitle}>Processing your verification</Text>
            <Text style={styles.statusMessage}>
              Please wait while we verify your information. This may take 1–2 working days.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff'}}>
    <View style={styles.container}>
      {renderContent()}
    </View>
    </ScrollView>
  );
};

export default KYCStatusPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  statusContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f4a97',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusMessage: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  redirecting: {
    marginTop: 12,
    fontSize: 13,
    color: '#888',
  },
});
