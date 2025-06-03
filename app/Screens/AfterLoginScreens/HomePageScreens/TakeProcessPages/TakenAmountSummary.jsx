import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { updateActiveAmount } from '../../../../store_management/actions/actions';
import { MaterialIcons } from '@expo/vector-icons';

const TakenAmountSummary = ({ navigation, route }) => {
  const { withdrawnAmount } = route.params;
  const [selectedPlan, setSelectedPlan] = useState(route.params?.selectedPlan || null);
  const [emiAmount, setEmiAmount] = useState(route.params?.emiAmount || null);
  const [includeLoanProtection, setIncludeLoanProtection] = useState(true);
  const [showLoanInfoModal, setShowLoanInfoModal] = useState(false);
  const userType = useSelector((state) => state.userType);

  const calculateEMI = (months, startDate = new Date()) => {
    const interestRates = { 3: 0.03, 6: 0.04, 12: 0.05 };
    const principal = withdrawnAmount;
    const interest = principal * interestRates[months];
    const total = principal + interest;
    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      return new Date(year, month + 1, 0).getDate(); // Last day of current month
    };

    if (userType === "driver") {


      let totalDays = 0;
      const start = new Date(startDate);

      for (let i = 0; i < months; i++) {
        const current = new Date(start.getFullYear(), start.getMonth() + i, 1);
        totalDays += getDaysInMonth(current);
      }

      const monthlyPayment = Math.round(total / months);
      const perDayRepayment = Math.round(total / totalDays);

      return {
        monthlyPayment,
        perDayRepayment
      };
    } else {

      return Math.round(total / months);
    }
  };


  const emi12 = calculateEMI(12);
  const emi6 = calculateEMI(6);
  const emi3 = calculateEMI(3);

  const platformFee = 120;
  const loanProtection = 40;
  const totalAmount = withdrawnAmount + platformFee + (includeLoanProtection ? loanProtection : 0);

  useEffect(() => {
    if (route.params?.selectedPlan) {
      setSelectedPlan(route.params.selectedPlan);
      setEmiAmount(route.params.emiAmount);
    }
  }, [route.params]);

  const handleEMIPlanPress = () => {
    navigation.navigate('EmiPlanPage', {
      withdrawnAmount,
      emi12,
      emi6,
      emi3,
    });
  };

  const dispatch = useDispatch();

  const handleDocumentsPress = () => {
    navigation.navigate('LoanDocumentsPage');
  };

  const toggleLoanProtection = () => {
    setIncludeLoanProtection(!includeLoanProtection);
  };

  const handleContinue = () => {
    dispatch(updateActiveAmount({
      amount: withdrawnAmount,
      totalAmount: totalAmount || withdrawnAmount + platformFee + loanProtection,
      withdrawnAmount: withdrawnAmount,
      emiThisMonth: emiAmount || calculateEMI(12),
      repaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
    navigation.navigate('TransferAmountPage');
  };

  return (
    <LinearGradient colors={['#e3f2fd', '#ffffff']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Withdrawn Amount</Text>
          <Text style={styles.amount}>₹{withdrawnAmount.toLocaleString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fee Breakdown</Text>

          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Platform Fee</Text>
            <Text style={styles.feeValue}>₹{platformFee}</Text>
          </View>

          <View style={styles.feeRow}>
            <View style={styles.feeLabelContainer}>
              <Text style={styles.feeLabel} onPress={() => setShowLoanInfoModal(true)}>Loan Protection</Text>
              <TouchableOpacity onPress={() => setShowLoanInfoModal(true)} style={{ marginLeft: 5 }}>

                <MaterialIcons name="info-outline" size={18} color="#0f4a97" />
              </TouchableOpacity>
            </View>
            <View style={styles.feeValueContainer}>
              <Text style={styles.feeValue}>₹{loanProtection}</Text>
              <TouchableOpacity onPress={toggleLoanProtection}>
                <Text style={styles.removeText}>
                  {includeLoanProtection ? 'Remove' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{totalAmount.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EMI Plan</Text>
          <TouchableOpacity style={styles.emiPlanContainer} onPress={handleEMIPlanPress}>

            <View style={styles.emiPlanLeft}>
              <Text style={styles.emiPlanLabel}>EMI Plan</Text>
            </View>
            <View style={styles.emiPlanRight}>
              <Text style={styles.emiPlanAmount}>
                {selectedPlan
                  ? selectedPlan
                  : userType === 'driver'
                    ? `12 X ₹${emi12.monthlyPayment}\n(₹${emi12.perDayRepayment}/day)`
                    : `12 X ₹${emi12}`}
              </Text>

            </View>

          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.documentsButton} onPress={handleDocumentsPress}>
            <Text style={styles.documentsButtonText}>KFS & Loan Documents</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      {showLoanInfoModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Loan Protection Info</Text>
            <Text style={styles.modalText}>
              Safeguard your loan with these valuable features:
              {"\n\n"}• Dues waived for up to 3 months in case you're hospitalized
              {"\n\n"}• Get up to 100% loan coverage in case of permanent disability or serious accidental injuries
              {"\n\n"}• Coverage for accidental death included
              {"\n\n"}• Hassle-free claim process with payments assured within 7 days
            </Text>
            <TouchableOpacity onPress={() => setShowLoanInfoModal(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 30 },
  scrollContainer: { padding: 20, paddingTop: 40 },
  amountContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  amountLabel: { fontSize: 16, color: '#666', marginBottom: 5 },
  amount: { fontSize: 28, fontWeight: 'bold', color: '#0f4a97' },
  section: {
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
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#0f4a97', marginBottom: 15 },
  feeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  feeLabelContainer: { flexDirection: 'row', alignItems: 'center' },
  feeValueContainer: { flexDirection: 'row', alignItems: 'center' },
  feeLabel: { fontSize: 16, color: '#333' },
  feeValue: { fontSize: 16, fontWeight: '500', color: '#333' },
  removeText: { fontSize: 12, color: '#0f4a97', marginLeft: 10, textDecorationLine: 'underline' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: { fontSize: 16, fontWeight: '600', color: '#333' },
  totalValue: { fontSize: 16, fontWeight: '600', color: '#0f4a97' },
  emiPlanContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f9ff',
    borderRadius: 8,
  },
  emiPlanLeft: { flex: 1 },
  emiPlanRight: { flex: 1, alignItems: 'flex-end' },
  emiPlanLabel: { fontSize: 16, color: '#0f4a97', fontWeight: '500' },
  emiPlanAmount: { fontSize: 16, color: '#0f4a97', fontWeight: 'bold' },
  documentsButton: {
    padding: 15,
    backgroundColor: '#f5f9ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  documentsButtonText: { fontSize: 16, color: '#0f4a97', fontWeight: '500' },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0f4a97',
  },
  modalText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 20,
    textAlign: 'left',
  },
  modalButton: {
    backgroundColor: '#0f4a97',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TakenAmountSummary;