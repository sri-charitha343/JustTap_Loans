import { StyleSheet, Text, TextInput, View, TouchableOpacity,ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

const NomineeDetailsPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    // You can also send other details via params if needed
    navigation.navigate('VerifyDetailsPage', { nominee: name });
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Nominee Details</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Relation" value={relation} onChangeText={setRelation} />
      <TextInput style={styles.input} placeholder="Date of Birth" value={dob} onChangeText={setDob} />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Add Nominee</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ScrollView>
  );
};

export default NomineeDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: '40%',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f4a97',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#0f4a97',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
