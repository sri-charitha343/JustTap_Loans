import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Platform,
  } from 'react-native';
  import React, { useState } from 'react';
  import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
  import moment from 'moment';  // For date formatting
  
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
  const TransactionDetails = ({ route, navigation }) => {
    const { transaction } = route.params;
    const [expanded, setExpanded] = useState(false);
  
    const getIcon = () => {
      switch (transaction.type) {
        case 'borrow':
          return <FontAwesome5 name="hand-holding-usd" size={30} color="#2563eb" />;
        case 'repayment':
          return <MaterialIcons name="payments" size={33} color="#059669" />;
        case 'failed':
          return <Ionicons name="close-circle" size={33} color="#dc2626" />;
        default:
          return null;
      }
    };
  
    const getLabel = () => {
      switch (transaction.type) {
        case 'borrow':
          return 'Loan Taken';
        case 'repayment':
          return 'Loan Paid';
        case 'failed':
          return 'Failed Attempt';
        default:
          return 'Unknown';
      }
    };
  
    const getAmountColor = () => {
      switch (transaction.type) {
        case 'borrow':
          return '#2563eb'; 
        case 'repayment':
          return '#059669'; 
        case 'failed':
          return '#dc2626'; 
        default:
          return '#0f172a'; 
      }
    };
  
    const toggleExpand = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    };
  
    const formatDate = (date) => moment(date).format('Do MMM, YYYY'); 
  
    const handleRetry = () => {
     
      console.log("Retrying failed transaction...");

    };
  
    return (
      <View style={styles.container}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
  
        <View style={styles.headerRow}>
          <Text style={styles.heading}>{getLabel()}</Text>
          {getIcon()}
        </View>
  
        <Text style={[styles.amountText, { color: getAmountColor() }]}>
          ₹{transaction.amount}
        </Text>
  
  
        <TouchableOpacity style={styles.detailsRow} onPress={toggleExpand}>
          <Text style={styles.detailsText}>Details</Text>
          <Text style={styles.detailsArrow}>⌄</Text>
        </TouchableOpacity>
  
        {expanded && (
          <View style={styles.detailsBox}>
            <Text style={styles.detailItem}>
              Transaction ID: TXN{transaction.id.padStart(5, '0')}
            </Text>
            <Text style={styles.detailItem}>Date: {formatDate(transaction.date)}</Text>
            <Text style={styles.detailItem}>Time: {moment(transaction.date).format('HH:mm')}</Text>
            <Text style={styles.detailItem}>
              Paid via: {transaction.type === 'failed' ? 'N/A' : 'UPI'}
            </Text>
          </View>
        )}
  
        {/* Retry Button for Failed Transactions */}
        {transaction.type === 'failed' && (
          <View style={styles.failedNoteBox}>
            <Text style={styles.failedNote}>
              If any amount was deducted, it will be refunded back within 5–7 working days.
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryText}>Retry Transaction</Text>
            </TouchableOpacity>
          </View>
        )}
  
        {/* View More Transaction History Link */}
        <TouchableOpacity style={styles.HelpButton}>
          <Text style={styles.HelpText}>Get Help</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default TransactionDetails;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f8fafc',
    },
    backButton: {
      backgroundColor: '#0f4a97',
      position: 'absolute',
      top: 50,
      left: 16,
      zIndex: 10,
      padding: 7,
      borderRadius: 10,
    },
    headerRow: {
      marginTop: '30%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    heading: {
      fontSize: 32,
      fontWeight: '700',
      color: '#1e293b',
    },
    amountText: {
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 10,
    },
       detailsRow: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailsText: {
      fontSize: 18,
      color: '#000',
      fontWeight: '600',
    },
    detailsArrow: {
      fontSize: 20,
      color: '#000',
    },
    detailsBox: {
      backgroundColor: '#e0f2fe',
      padding: 14,
      borderRadius: 10,
      marginTop: 10,
    },
    detailItem: {
      fontSize: 15,
      color: '#1e3a8a',
      marginBottom: 6,
    },
    failedNoteBox: {
      marginTop: 20,
      borderTopWidth: 2,
      borderTopColor: '#f87171',
      paddingTop: 12,
    },
    failedNote: {
      fontSize: 15,
      color: '#b91c1c',
      fontWeight: '600',
    },
    retryButton: {
      backgroundColor: '#dc2626',
      padding: 12,
      borderRadius: 8,
      marginTop: 10,
      alignItems: 'center',
    },
    retryText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    HelpButton: {
      marginTop: 20,
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#0f4a97',
      borderRadius: 8,
    },
    HelpText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  