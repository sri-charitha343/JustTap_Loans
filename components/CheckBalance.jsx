import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CheckBalanceModal = ({ visible, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [banks, setBanks] = useState([]);

  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: width / 2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const handleAddBank = () => {
    if (bankName && accountNumber && ifscCode) {
      const newBank = { bankName, accountNumber, ifscCode };
      setBanks([...banks, newBank]);
      setBankName('');
      setAccountNumber('');
      setIfscCode('');
      setShowForm(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.drawerContainer, { left: slideAnim }]}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <MaterialIcons name="account-balance" size={28} color="#0F4A97" />
            <Text style={styles.headerText}>Add Bank Details</Text>
          </View>

          <TouchableOpacity onPress={() => setShowForm(!showForm)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Bank Details</Text>
          </TouchableOpacity>

          {showForm && (
            <View style={styles.form}>
              <TextInput
                placeholder="Bank Name"
                style={styles.input}
                value={bankName}
                onChangeText={setBankName}
              />
              <TextInput
                placeholder="Account Number"
                style={styles.input}
                keyboardType="numeric"
                value={accountNumber}
                onChangeText={setAccountNumber}
              />
              <TextInput
                placeholder="IFSC Code"
                style={styles.input}
                value={ifscCode}
                onChangeText={setIfscCode}
              />
              <TouchableOpacity onPress={handleAddBank} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={banks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.bankCard}>
                <Text style={styles.bankText}>🏦 {item.bankName}</Text>
                <Text>Account: {item.accountNumber}</Text>
                <Text>IFSC: {item.ifscCode}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 10 }}
          />

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ color: '#0F4A97', fontWeight: 'bold' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default CheckBalanceModal;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width /2,
    backgroundColor: '#fff',
    elevation: 10,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  inner: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  submitButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bankCard: {
    padding: 12,
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    marginBottom: 10,
  },
  bankText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
});
