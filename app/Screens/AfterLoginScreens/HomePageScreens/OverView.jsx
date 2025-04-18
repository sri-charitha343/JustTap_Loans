import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CheckBalanceModal from '../../../../components/CheckBalance'


const OverView = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState('All');
    const [modalVisible, setModalVisible] = useState(false); 

    const mockTransactions = [
        { id: '1', date: '2025-03-01', amount: '₹5000', status: 'Paid' },
        { id: '2', date: '2025-04-01', amount: '₹4500', status: 'Failed' },
        { id: '3', date: '2025-04-02', amount: '₹2000', status: 'Paid' },
        { id: '4', date: '2025-02-15', amount: '₹3000', status: 'Paid' },
    ];

    const currentMonth = new Date().toISOString().slice(0, 7);

    const filteredTransactions =
        selected === 'All'
            ? mockTransactions
            : mockTransactions.filter(transaction =>
                  transaction.date.startsWith(currentMonth)
              );

    const sortedTransactions = filteredTransactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const calculateDaysLeft = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 ? diffDays : 0;
    };

    const renderTransaction = ({ item }) => (
        <View style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
                <Text
                    style={[
                        styles.transactionStatus,
                        item.status === 'Paid' ? styles.paid : styles.failed
                    ]}
                >
                    {item.status}
                </Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Bar with Back and Check Balance */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={28} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.checkBalanceBox}>
                    <Text style={styles.checkBalanceText}>Check Balance</Text>
                </TouchableOpacity>
            </View>

            <CheckBalanceModal visible={modalVisible} onClose={() => setModalVisible(false)} />

            <View style={styles.MainContainer}>
                <View style={styles.Header}>
                    <TouchableOpacity
                        onPress={() => setSelected('All')}
                        style={styles.buttonContainer}
                    >
                        <View
                            style={[
                                styles.selectionBox,
                                selected === 'All' && styles.activeSelection
                            ]}
                        />
                        <Text
                            style={[
                                styles.HeaderText,
                                selected === 'All' && styles.activeText
                            ]}
                        >
                            All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelected('Month')}
                        style={styles.buttonContainer}
                    >
                        <View
                            style={[
                                styles.selectionBox,
                                selected === 'Month' && styles.activeSelection
                            ]}
                        />
                        <Text
                            style={[
                                styles.HeaderText,
                                selected === 'Month' && styles.activeText
                            ]}
                        >
                            Month
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Loan Repayment Box */}
                <View style={styles.loanBox}>
                    <View>
                        <Text style={styles.loanTitle}>Loan Repayment</Text>
                        <Text style={styles.loanDetail}>Amount: ₹10,000</Text>
                        <Text style={styles.loanDetail}>Due Date: 2025-04-20</Text>
                    </View>
                    <Text style={styles.daysLeft}>{calculateDaysLeft('2025-04-20')} Days Left</Text>
                </View>

                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceText}>Balance: ₹0</Text>
                </View>
            </View>

            <View style={styles.listContainer}>
                <Text style={styles.listHeader}>Transaction History</Text>
                <FlatList
                    data={sortedTransactions}
                    keyExtractor={item => item.id}
                    renderItem={renderTransaction}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>

            <TouchableOpacity style={styles.showMoreButton} onPress={() => navigation.navigate('AllTransactions')}>
                <Text style={styles.showMoreButtonText}>Show More</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default OverView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    topBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#0f4a97',
    },
    checkBalanceBox: {
        backgroundColor: '#0F4A97',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: 'center',
    },
    checkBalanceText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    MainContainer: {
        marginTop: 20,
        backgroundColor: '#f1f8ff',
        padding: 10,
        width: '100%',
        height: '50%',
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10
    },
    buttonContainer: {
        alignItems: 'center',
        position: 'relative'
    },
    selectionBox: {
        position: 'absolute',
        bottom: -5,
        width: '100%',
        height: 5,
        backgroundColor: 'transparent',
        borderRadius: 5
    },
    activeSelection: {
        backgroundColor: '#0f4a97'
    },
    HeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    activeText: {
        color: '#0f4a97'
    },
    loanBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0f4a97',
        padding: 15,
        borderRadius: 10,
        width: '90%',
    },
    loanTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    loanDetail: {
        fontSize: 14,
        color: 'white',
    },
    daysLeft: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    balanceContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        marginBottom: 10
    },
    balanceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    listContainer: {
        flex: 1,
        width: '100%',
        marginTop: 20
    },
    listHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#0f4a97'
    },
    transactionItem: {
        padding: 12,
        marginVertical: 5,
        backgroundColor: '#eef4ff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    transactionLeft: {
        flexDirection: 'column'
    },
    transactionStatus: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    paid: {
        color: 'green'
    },
    failed: {
        color: 'red'
    },
    transactionDate: {
        fontSize: 12,
        color: '#666'
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    showMoreButton: {
        marginTop: 20,
        backgroundColor: '#0f4a97',
        borderRadius: 10,
        padding: 5,
        width: '50%',
        alignItems: 'center'
    },
    showMoreButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        padding: 10
    }
});
