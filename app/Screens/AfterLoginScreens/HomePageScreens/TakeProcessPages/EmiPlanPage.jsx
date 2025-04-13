import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const EmiPlanPage = ({ navigation, route }) => {
  const { emi12, emi6, emi3, withdrawnAmount } = route.params;

  const handlePlanSelect = (months, amount) => {
    navigation.navigate('TakenAmountSummary', {
      selectedPlan: `${months} X ₹${amount}`,
      emiAmount: amount,
      withdrawnAmount
    });
  };

  return (
    <LinearGradient colors={['#e3f2fd', '#ffffff']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Choose Your EMI Plan</Text>

        <TouchableOpacity 
          style={styles.planContainer}
          onPress={() => handlePlanSelect(12, emi12)}
        >
          <Text style={styles.planDuration}>12 Months</Text>
          <Text style={styles.planAmount}>12 X ₹{emi12}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.planContainer}
          onPress={() => handlePlanSelect(6, emi6)}
        >
          <Text style={styles.planDuration}>6 Months</Text>
          <Text style={styles.planAmount}>6 X ₹{emi6}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.planContainer}
          onPress={() => handlePlanSelect(3, emi3)}
        >
          <Text style={styles.planDuration}>3 Months</Text>
          <Text style={styles.planAmount}>3 X ₹{emi3}</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f4a97',
    marginBottom: 30,
    textAlign: 'center',
  },
  planContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  planDuration: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f4a97',
    marginBottom: 5,
  },
  planAmount: {
    fontSize: 16,
    color: '#333',
  },
});

export default EmiPlanPage;
