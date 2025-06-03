import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

const EmiPlanPage = ({ navigation, route }) => {
  const { emi12, emi6, emi3, withdrawnAmount } = route.params;
   const userType = useSelector((state) => state.userType);
const handlePlanSelect = (months, amount) => {
  let selectedPlan = '';
  let emiAmount = null;
  let perDayRepayment = null;

  if (userType === 'driver') {
    selectedPlan = `${months} X ₹${amount.monthlyPayment}\n(₹${amount.perDayRepayment}/day)`;
    emiAmount = amount.monthlyPayment;
    perDayRepayment = amount.perDayRepayment;
    
  } else {
    selectedPlan = `${months} X ₹${amount}`;
    emiAmount = amount;
  }
   console.log(selectedPlan)
  navigation.navigate('TakenAmountSummary', {
    selectedPlan,
    emiAmount,
    perDayRepayment,
    withdrawnAmount,
    months
  });
};


  return (
    <LinearGradient colors={['#e3f2fd', '#ffffff']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Choose Your EMI Plan</Text>
         { userType === 'driver' ?(
          <>
           <TouchableOpacity 
          style={styles.planContainer}
          onPress={() => handlePlanSelect(12, emi12)}
        >
          <Text style={styles.planDuration}>12 Months</Text>
          <Text style={styles.planAmount}>
            12 X ₹{emi12.monthlyPayment} (₹{emi12.perDayRepayment}/day)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.planContainer}
          onPress={() => handlePlanSelect(6, emi6)}
        >
          <Text style={styles.planDuration}>6 Months</Text>
          <Text style={styles.planAmount}>
            6 X ₹{emi6.monthlyPayment} (₹{emi6.perDayRepayment}/day)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.planContainer}
          onPress={() => handlePlanSelect(3, emi3)}
        >
          <Text style={styles.planDuration}>3 Months</Text>
          <Text style={styles.planAmount}>
            3 X ₹{emi3.monthlyPayment} (₹{emi3.perDayRepayment}/day)
          </Text>
        </TouchableOpacity>
          </>
         ):(
           <>

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
           </>
         )}
       
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
