import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform,
    TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AllTransactions = ({ navigation }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [enteredYear, setEnteredYear] = useState(String(new Date().getFullYear()));

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const mockTransactions = [
        { id: '1', date: '2025-03-01', amount: '₹5000', status: 'Paid' },
        { id: '2', date: '2025-04-01', amount: '₹4500', status: 'Failed' },
        { id: '3', date: '2025-04-02', amount: '₹2000', status: 'Paid' },
        { id: '4', date: '2025-02-15', amount: '₹3000', status: 'Paid' },
    ];

    useEffect(() => {
        navigation.setOptions({ title: 'Transactions History' });
    }, [navigation]);

    const selectedMonthString = `${enteredYear}-${String(selectedMonth + 1).padStart(2, '0')}`;

    const filteredTransactions = mockTransactions.filter(t =>
        t.date.startsWith(selectedMonthString)
    );

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
            <Text style={styles.label}>Select Month:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedMonth}
                    onValueChange={itemValue => setSelectedMonth(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                >
                    {months.map((month, index) => (
                        <Picker.Item key={index} label={month} value={index} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Enter Year:</Text>
            <TextInput
                style={styles.textInput}
                value={enteredYear}
                onChangeText={setEnteredYear}
                keyboardType="numeric"
                maxLength={4}
                placeholder="e.g. 2025"
            />

            <Text style={styles.historyHeader}>Transaction History</Text>
            <Text style={styles.monthHeader}>{months[selectedMonth]}</Text>

            {filteredTransactions.length > 0 ? (
                <FlatList
                    data={filteredTransactions}
                    keyExtractor={item => item.id}
                    renderItem={renderTransaction}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <Text style={styles.nothingText}>Nothing to see 😕</Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#0f4a97',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 5,
        overflow: 'hidden',
    },
    picker: {
        height: Platform.OS === 'ios' ? 150 : 50,
        width: '100%',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginVertical: 8,
        fontSize: 16,
        color: '#000'
    },
    historyHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#0f4a97'
    },
    monthHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#000'
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
    nothingText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#555'
    }
});

export default AllTransactions;
