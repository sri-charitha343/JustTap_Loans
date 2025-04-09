import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const BasicProfileDetailsCustomer = () => {
  const navigation = useNavigation()
  const [aadharVerified, setAadharVerified] = useState(false)
  const [panVerified, setPanVerified] = useState(false)

  const customerDetails = useSelector(state => state.customers.data) || {};


  const handleAadharClick = () => {
    navigation.navigate('AadharUpload')
    setAadharVerified(true)
  }

  const handlePanClick = () => {
    navigation.navigate('PanCard')
    setPanVerified(true)
  }

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <FontAwesome name="user-circle" size={100} color="#ccc" />
      </View>

      {/* Customer Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Name: {customerDetails.name}</Text>
        <Text style={styles.detailText}>Email: {customerDetails.email}</Text>
        <Text style={styles.detailText}>Mobile: {customerDetails.phoneNumber}</Text>
        <Text style={styles.detailText}>Gender: {customerDetails.gender}</Text>
        <Text style={styles.detailText}>DOB: {customerDetails.dateOfBirth}</Text>
      </View>

      {/* Document Boxes */}
      <View style={styles.documentsContainer}>
        <TouchableOpacity 
          style={[styles.documentBox, aadharVerified && styles.verifiedBox]}
          onPress={handleAadharClick}
        >
          <Image 
            source={require('../../../assets/Images/aadhar.png')} 
            style={styles.documentIcon}
          />
          <Text style={styles.documentText}>Aadhar Card</Text>
          {aadharVerified && <FontAwesome name="check-circle" size={24} color="green" />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.documentBox, panVerified && styles.verifiedBox]}
          onPress={handlePanClick}
        >
          <Image 
            source={require('../../../assets/Images/pancard.png')} 
            style={styles.documentIcon}
          />
          <Text style={styles.documentText}>PAN Card</Text>
          {panVerified && <FontAwesome name="check-circle" size={24} color="green" />}
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={[styles.nextButton, (!aadharVerified || !panVerified) && styles.disabledButton]}
        disabled={!aadharVerified || !panVerified}
        onPress={() => navigation.navigate('TakeSelfie')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasicProfileDetailsCustomer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0F4A97', // Blue background
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  detailsContainer: {
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // White transparent background
    padding: 15,
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#fff', // White text color
  },
  documentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  documentBox: {
    width: '48%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  verifiedBox: {
    borderColor: 'green',
  },
  documentIcon: {
    width: 75,
    height: 60,
    marginBottom: 10,
  },
  documentText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  nextButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: '#0F4A97',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
