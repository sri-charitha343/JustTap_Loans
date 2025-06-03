import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BorrowingDetails = ({ route,navigation }) => {

    const { item, transaction } = route.params || {};
    console.log('Borrowing Details Item:', item);
    console.log('Transaction Details:', transaction);

    const amountString = item?.amount || transaction?.amount || '0';
    const numericAmount = parseFloat(amountString.replace(/[^0-9.]/g, '')) || 0;
    console.log('Borrowing Details Numeric Amount:', numericAmount);
    const transferAmount = numericAmount - 10;



    const handleRepay = () => {
        alert('Repay button pressed!');
    };

    return (

        <View style={styles.fullScreen}>
            <ScrollView contentContainerStyle={styles.container}>
                <LinearGradient colors={['#DFF2FF', '#F0F8FF']} style={styles.headerBox}>
                    <View style={styles.rowSpaceBetween}>
                        <View>
                            <Text style={styles.label}>Taken Amount</Text>
                            <Text style={styles.amount}>{item?.amount || transaction?.amount || 'N/A'}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.label}>Date</Text>
                            <Text style={styles.amount}>{item?.date || transaction?.date || 'N/A'}</Text>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.card}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Transfer Amount</Text>
                        <Text style={styles.infoValue}>₹{transferAmount}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Flat Fee</Text>
                        <Text style={styles.infoValue}>₹10</Text>
                    </View>
                    <View style={styles.infoRow}>
                        {transaction ? (
                            <>
                                <Text style={styles.infoLabel}>Principal Paid</Text>
                                <Text style={[styles.infoValue, { color: '#10B981' }]}>{transaction.amount}</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.infoLabel}>Principal Paid</Text>
                                <Text style={[styles.infoValue, { color: '#10B981' }]}>₹0</Text>
                            </>
                        )}
                    </View>

                    <View style={styles.infoRow}>
                            {transaction ? (
                            <>
                            <Text style={styles.infoLabel}>Principal Remaining</Text>
                        <Text style={[styles.infoValue, { color: '#F59E0B' }]}>
                            ₹0
                        </Text>
                            </>
                        ):(
                            <>
                        <Text style={styles.infoLabel}>Principal Remaining</Text>
                        <Text style={[styles.infoValue, { color: '#F59E0B' }]}>
                            {item?.amount || 'N/A'}
                        </Text>
                        </>
                        )} ``
                    </View>
                </View>
                        <>
                      {item?.status === 'Active' &&
                        <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('SingleRepaymentSchedule',{ item })}>
                          <Text style={styles.featureTitle}>⏳ Repay Rhythm</Text>
                          <Text style={styles.featureDescription}>
                            You Can Check Your Repayment Schedule and Plan Your Payments
                          </Text>
                        </TouchableOpacity>
                       }
                       </>
            </ScrollView>
           {item?.status === 'Active' &&
            <TouchableOpacity style={styles.repayButton} onPress={handleRepay}>
                <Text style={styles.repayButtonText}>Repay Now</Text>
            </TouchableOpacity>
}
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
        paddingBottom: 150,
    },
    headerBox: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 6,
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E3A8A',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomColor: '#E2E8F0',
        borderBottomWidth: 1,
    },
    infoLabel: {
        fontSize: 15,
        color: '#64748B',
    },
    infoValue: {
        fontWeight: '600',
        fontSize: 15,
        color: '#1E293B',
    },
     featureCard: {
    backgroundColor: '#0f4a97',
    borderRadius: 20,
    padding: 15,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
 
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 13,
    textAlign: 'center',
    color: '#0fffff',
    marginTop: 5,
  },
    repayButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#2563EB',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
    },
    repayButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default BorrowingDetails;
