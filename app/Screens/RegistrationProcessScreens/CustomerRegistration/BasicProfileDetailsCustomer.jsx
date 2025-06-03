import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesome } from '@expo/vector-icons'
import { setStdIdVerified } from '../../../store_management/actions/actions'
import { setAadharVerified } from '../../../store_management/actions/aadharActions'
import { setPanVerified } from '../../../store_management/actions/panActions'

const BasicProfileDetailsCustomer = ({ navigation }) => {

  const dispatch = useDispatch()

  const aadharVerified = useSelector(state => state.aadharVerified)
  const panVerified = useSelector(state => state.panVerified)
  const stdIdVerified = useSelector(state => state.stdIdVerified)
  const userData = useSelector(state => state.userData);
  console.log("user data:", userData);

  const userType = useSelector((state) => state.userType);
  console.log("user type:", userType);
  const categorySelected = useSelector(state => state.loan.selectedCategory)

  const handleAadharClick = () => {
    navigation.navigate('AadharUpload')
  }

  const handlePanClick = () => {
    navigation.navigate('PanCard')
  }

  const handleStdIdClick = () => {
    navigation.navigate('StudentId')
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }} // extra scroll space
    >
      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <FontAwesome name="user-circle" size={100} color="#ccc" />
      </View>

      {/* Customer Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Name: {userData.name}</Text>
        <Text style={styles.detailText}>Email: {userData.email}</Text>
        <Text style={styles.detailText}>Mobile: {userData.phoneNumber || userData.mobileNumber}</Text>
        <Text style={styles.detailText}>Gender: {userData.gender}</Text><Text style={styles.detailText}>
          DOB: {(userData.dateOfBirth || userData.dob)?.toLocaleDateString?.() || ''}
        </Text>

      </View>

      {/* Document Boxes */}
      <View style={styles.documentsContainer}>
        <TouchableOpacity
          style={[styles.documentBox, aadharVerified && styles.verifiedBox]}
          onPress={handleAadharClick}
        >
          <Image
            source={require('../../../../assets/Images/aadhar.png')}
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
            source={require('../../../../assets/Images/pancard.png')}
            style={styles.documentIcon}
          />
          <Text style={styles.documentText}>PAN Card</Text>
          {panVerified && <FontAwesome name="check-circle" size={24} color="green" />}
        </TouchableOpacity>
      </View>

      {/* Student ID (if applicable) */}
      {categorySelected === 'student' && (
        <View style={styles.stdIdWrapper}>
          <Text style={styles.StdIdHeading}>Upload Your Student ID</Text>
          <TouchableOpacity
            style={[styles.stdDocumentBox, stdIdVerified && styles.verifiedBox]}
            onPress={handleStdIdClick}
          >
            <Image
              source={require('../../../../assets/Images/StudentId2.jpg')}
              style={styles.stdIdIcon}
            />
            <Text style={styles.documentText}>Student ID</Text>
            {stdIdVerified && <FontAwesome name="check-circle" size={24} color="green" />}
          </TouchableOpacity>
        </View>
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          (!aadharVerified || !panVerified || (categorySelected === 'student' && !stdIdVerified)) && styles.disabledButton
        ]}
        disabled={!aadharVerified || !panVerified || (categorySelected === 'student' && !stdIdVerified)}
        onPress={() => navigation.navigate('TakeSelfie')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Spacer to allow scroll */}
      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

export default BasicProfileDetailsCustomer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0F4A97',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  detailsContainer: {
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#000',
    fontWeight: 'bold',
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
  stdIdIcon: {
    width: 100,
    height: 65,
    marginBottom: 10,
  },
  StdIdHeading: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  stdDocumentBox: {
    width: '70%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  stdIdWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
})
