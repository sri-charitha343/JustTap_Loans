import React,{useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LoanProcessingScreen = ({navigation}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          const loanApproved = Math.random() < 0.5; // Simulate result
          navigation.navigate('AfterProcessingPage');
        }, 5000);
        return () => clearTimeout(timer);
      }, []);
      
  return (
    <View style={styles.container}>
      {/* Glowing ring animation can be replaced by Lottie later */}
      <View style={styles.loaderContainer}>
        <View style={styles.glowCircle}>
          <MaterialIcons name="hourglass-bottom" size={60} color="#fff" />
        </View>
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      </View>

      {/* Message */}
      <View style={styles.messageBox}>
        <Text style={styles.heading}>Details Submitted</Text>
        <Text style={styles.subText}>
          Please wait for <Text style={styles.highlight}>24-48 hours</Text> to know your loan status.
        </Text>
        <Text style={styles.thankYou}>Thank you for your patience!</Text>
      </View>
    </View>
  );
};

export default LoanProcessingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f4a97',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  loaderContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  glowCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff33',
    shadowColor: '#fff',
    shadowOpacity: 0.7,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  messageBox: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#fff',
  },
  thankYou: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
