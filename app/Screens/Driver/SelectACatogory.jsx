import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const SelectACatogory = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleDriverSelection = async () => {
    setLoading(true);
    try {
      navigation.navigate('EnterDriverId');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to proceed as driver');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSelection = async () => {
    setLoading(true);
    try {
      navigation.navigate('BasicProfileDetailsCustomer');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to proceed as customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Please wait, fetching profile details...</Text>
      ) : (
        <>
          <Text style={styles.title}>Select a Category</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCustomerSelection}
          >
            <Text style={styles.buttonText}>Continue as Customer</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleDriverSelection}
          >
            <Text style={styles.buttonText}>Continue as Driver</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default SelectACatogory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0F4A97',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  orText: {
    fontSize: 16,
    marginVertical: 10,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F4A97',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
