import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native';

const VerifyDetailsPage = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [nomineeName, setNomineeName] = useState('');
  const [address, setAddress] = useState(
    "48-320, S-2, Siri's Sri Nilayam, Ganesh Nagar, Chintal, Hyderabad, Telangana 500054"
  );
  const [editingAddress, setEditingAddress] = useState(false);

  useEffect(() => {
    if (isFocused && route.params?.nominee) {
      setNomineeName(route.params.nominee);
    }
  }, [isFocused, route.params]);

  const handleNext = () => {
  Alert.alert(
    "Confirm Details",
    "After clicking on Next, you will be redirected to Video KYC Verification. You cannot change the details after this.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("User cancelled"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => navigation.navigate('VedioKYCVerifyPage')
      }
    ],
    { cancelable: true }
  );
};

  return (
    <ScrollView style={{ backgroundColor: '#fff'}}>
    <View style={styles.container}>
      <Text style={styles.heading}>Verify Your Details</Text>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Sri Charitha</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Date of Birth</Text>
        <Text style={styles.value}>03 April 2003</Text>
      </View>

     <View style={styles.detailBox}>
  <View style={styles.rowBetween}>
    <Text style={styles.label}>Address</Text>
    <TouchableOpacity onPress={() => {
      if (editingAddress) {
        console.log('Saving address:', address);
      }
      setEditingAddress(!editingAddress);
    }}>
      <Ionicons
        name={editingAddress ? "checkmark" : "pencil"}
        size={20} backgroundColor='#0f4a97' padding={3} 
        color={editingAddress ? "green" : "white"}
      />
    </TouchableOpacity>
  </View>
  {editingAddress ? (
    <TextInput
      style={styles.input}
      value={address}
      onChangeText={setAddress}
      multiline
    />
  ) : (
    <Text style={styles.value}>{address}</Text>
  )}
</View>


      <View style={styles.detailBox}>
        <Text style={styles.label}>PAN Number</Text>
        <Text style={styles.value}>ABCDE1234F</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Aadhar Number</Text>
        <Text style={styles.value}>123456789012</Text>
      </View>

      {nomineeName ? (
        <View style={styles.detailBox}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Nominee</Text>
            <TouchableOpacity onPress={() => navigation.navigate('NomineeDetailsPage')}>
              <Ionicons name="pencil" backgroundColor='#0f4a97' top={'50%'} padding={3}  size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.value}>{nomineeName}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.nomineeButton}
          onPress={() => navigation.navigate('NomineeDetailsPage')}
        >
          <Text style={styles.nomineeButtonText}>Add Nominee</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default VerifyDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 30,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f4a97',
    marginBottom: 20,
  },
  detailBox: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  nomineeButton: {
    marginTop: 30,
    backgroundColor: '#0f0f0f',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  nomineeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  nextButton: {
    backgroundColor: '#0f4a97',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
