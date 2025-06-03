import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CheckBalanceModal from '../../../../components/CheckBalance';

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

    // const mockPastBorrowings = [
    //     { id: 'b1', date: '2025-01-05', amount: '₹4000', startDate: '2025-01-01', endDate: '2025-02-01' },
    //     { id: 'b2', date: '2025-02-10', amount: '₹3000', startDate: '2025-02-01', endDate: '2025-03-01' },
    //     { id: 'b3', date: '2025-03-12', amount: '₹2000', startDate: '2025-03-01', endDate: '2025-04-01' },
    //     { id: 'b4', date: '2025-04-01', amount: '₹1000', startDate: '2025-03-30', endDate: '2025-04-15' },
    //     { id: 'b5', date: '2025-04-15', amount: '₹5000', startDate: '2025-04-01', endDate: '2025-04-20' },
    // ];

    const currentMonth = new Date().toISOString().slice(0, 7);

    const filteredTransactions =
        selected === 'All'
            ? mockTransactions.filter(transaction => transaction.status !== 'Failed')
            : mockTransactions.filter(
                transaction =>
                    transaction.date.startsWith(currentMonth) &&
                    transaction.status !== 'Failed'
            );

    const sortedTransactions = filteredTransactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const calculateDaysLeft = dueDate => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 ? diffDays : 0;
    };

    const renderTransaction = ({ item }) => (
        <View style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
                <Text style={[styles.transactionStatus, styles.paid]}>{item.status}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={styles.checkBalanceBox}
                    >
                        <Text style={styles.checkBalanceText}>+Add Bank</Text>
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
                                style={[styles.selectionBox, selected === 'All' && styles.activeSelection]}
                            />
                            <Text
                                style={[styles.HeaderText, selected === 'All' && styles.activeText]}
                            >
                                All
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSelected('Month')}
                            style={styles.buttonContainer}
                        >
                            <View
                                style={[styles.selectionBox, selected === 'Month' && styles.activeSelection]}
                            />
                            <Text
                                style={[styles.HeaderText, selected === 'Month' && styles.activeText]}
                            >
                                Month
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.loanBox}>
                        <View style={{ justifyContent: 'flex-start' }}>
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
                    <Text style={styles.listHeader}>Repayments</Text>
                    <FlatList
                        data={[...sortedTransactions, { id: 'showMore' }]}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            item.id === 'showMore' ? (
                                <TouchableOpacity
                                    style={styles.showMoreButton}
                                    onPress={() => navigation.navigate('AllTransactions')}
                                >
                                    <Text style={styles.showMoreButtonText}>Show More</Text>
                                </TouchableOpacity>
                            ) : (
                                renderTransaction({ item })
                            )
                        }
                    />
                </View>

                {/* <View style={[styles.listContainer, { height: 200 }]}>
                    <Text style={styles.listHeader}>Concluded Loans</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: 10 }}
                    >
                        {[...mockPastBorrowings, { id: 'showMorePast', showMore: true }].map((item) =>
                            item.showMore ? (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.showMoreButton}
                                    onPress={() => navigation.navigate('AllBorrowings')}
                                >
                                    <Text style={styles.showMoreButtonText}>Show More</Text>
                                </TouchableOpacity>
                            ) : (
                                <View
                                    key={item.id}
                                    style={[styles.transactionItem, {
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginRight: 10,
                                        width: 250,
                                    }]}
                                >
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                                        <Text style={styles.Dates}>{item.startDate} - {item.endDate}</Text>
                                        <Text style={[styles.transactionStatus, styles.borrowed, { marginTop: 5 }]}>
                                            Loan Taken on
                                        </Text>
                                        <Text style={styles.transactionDate}>{item.date}</Text>
                                    </View>
                                    <Text style={[styles.transactionAmount, { marginLeft: 10, marginTop: 35 }]}>
                                        {item.amount}
                                    </Text>
                                </View>
                            )
                        )}
                    </ScrollView>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default OverView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 35,
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
        borderRadius: 20,
        alignItems: 'center',
    },
    Header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    selectionBox: {
        position: 'absolute',
        bottom: -5,
        width: '100%',
        height: 5,
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    activeSelection: {
        backgroundColor: '#0f4a97',
    },
    HeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    activeText: {
        color: '#0f4a97',
    },
    loanBox: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0f4a97',
        padding: 10,
        borderRadius: 10,
        width: '90%',
    },
    loanTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        width: '100%',
    },
    loanDetail: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        width: '100%',
    },
    daysLeft: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    balanceContainer: {
        marginTop: 20,
        backgroundColor:'white',
        padding: 15,
        borderRadius: 10,
        width: '90%',
    },
    balanceText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
    },
    listContainer: {
        marginTop: 20,
    },
    listHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    transactionItem: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    transactionLeft: {
        flexDirection: 'column',
    },
    transactionStatus: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    transactionDate: {
        fontSize: 13,
        color: '#666',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'right',
    },
    paid: {
        color: 'green',
    },
    borrowed: {
        color: '#0f4a97',
    },
    Dates: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
    },
    showMoreButton: {
        padding: 10,
        backgroundColor: '#0f4a97',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        minWidth: 100,
    },
    showMoreButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
