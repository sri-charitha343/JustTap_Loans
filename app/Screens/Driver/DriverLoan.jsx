import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory } from '../../store_management/actions/actions';

const DriverLoan = ({ navigation }) => {
  const dispatch = useDispatch();
  const driversState = useSelector(state => state.drivers);
  const driver = driversState.data;
  console.log("Driver details:", JSON.stringify(driver, null, 2));

  const getLoanAmount = () => {
    switch (driver.vehicleType) {
      case 'bike':
        return 10000;
      case 'auto':
        return 20000;
      case 'car':
        return 30000;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (driver && driver.vehicleType) {
      const amount = getLoanAmount();
      dispatch(setSelectedCategory(driver.vehicleType, amount));
    }
  }, [driver, dispatch]);

  return (
    <LinearGradient colors={['#0F4A97', '#1565C0']} style={styles.container}>
      <Text style={styles.welcomeText}>Hi {driver.name},</Text>
      <Text style={styles.subText}>Welcome to Just Tap Loans</Text>

      <View style={styles.eligibilityBox}>
        <Text style={styles.congratsText}>🎉Congratulations!🎉</Text>
        <Text style={styles.eligibleText}>
          You are eligible for the loan amount of:
        </Text>
        
        <Text style={styles.amount}>₹ {getLoanAmount()}</Text>
      </View>

      <Text style={styles.instructionText}>
        Want to take a loan? Follow the steps by clicking on "Next".
      </Text>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('TakeSelfieDriver')}>
        <LinearGradient colors={['#0D3C7E', '#0B2E66']} style={styles.gradientButton}>
          <Text style={styles.nextButtonText}>Next →</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DriverLoan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  subText: {
    fontSize: 18,
    color: '#E3F2FD',
    marginBottom: 20,
  },
  eligibilityBox: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    width: '85%',
    marginBottom: 25,
  },
  congratsText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F4A97',
  },
  eligibleText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F4A97',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  instructionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  nextButton: {
    width: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
