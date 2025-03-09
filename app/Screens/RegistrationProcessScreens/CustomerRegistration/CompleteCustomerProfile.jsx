import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store_management/actions/actions';

const CompleteCustomerProfile = () => {
  const dispatch = useDispatch();

  const customerDetails = useSelector(state => state.customers.data);
  const profilePicture = useSelector(state => state.profileImage);
  const aadharNumber = useSelector(state => state.aadharNumber);
  const panNumber = useSelector(state => state.panNumber);

  const navigation = useNavigation();
  const [validImage, setValidImage] = useState(false);

  useEffect(() => {
    if (profilePicture) {
      setValidImage(true);
    }
  }, [profilePicture]);

  const handleNext = () => {
    const userData = {
      name: customerDetails.name,
      dob: customerDetails.dob,
      gender: customerDetails.gender,
      mobileNumber: customerDetails.phoneNumber,
      email: customerDetails.email,
      ridesCompleted: customerDetails.ridesCompleted,
      aadhar: aadharNumber  || 'Not available',
      pancard: panNumber  || 'Not available',
    };
    dispatch(setUserData(userData));
    console.log(userData);// Dispatch user data before navigating
  

    navigation.navigate('Processing');

  };

  return (
    <View style={styles.container}>

      {/* Profile Picture */}
      <View style={styles.imageContainer}>
        {validImage && profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            style={styles.profileImage}
            onError={() => setValidImage(false)}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>No Image</Text>
          </View>
        )}
      </View>
      
      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>0.0/5</Text>
        {[...Array(5)].map((_, index) => (
          <FontAwesome key={index} name="star" size={24} color="white" />
        ))}
      </View>

      {/* User Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Name: {customerDetails?.name || 'N/A'}</Text>
        <Text style={styles.detail}>DOB: {customerDetails?.dob || 'N/A'}</Text>
        <Text style={styles.detail}>Gender: {customerDetails?.gender || 'N/A'}</Text>
        <Text style={styles.detail}>Mobile: {customerDetails?.phoneNumber || 'Not available'}</Text>
        <Text style={styles.detail}>Email: {customerDetails?.email || 'N/A'}</Text>
        <Text style={styles.detail}>No. of Rides Taken: {customerDetails?.ridesCompleted || 0}</Text>
        <Text style={styles.detail}>Aadhar No: {aadharNumber || 'Not available'}</Text>
        <Text style={styles.detail}>PAN No: {panNumber || 'Not available'}</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0F4A97",
    padding: 20
  },
  imageContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover'
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    color: "#0F4A97",
    fontWeight: "bold"
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  ratingText: {
    color: "white",
    fontSize: 18,
    marginRight: 5
  },
  detailsContainer: {
    width: "97%",
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  detail: {
    color: "white",
    fontSize: 16,
    marginBottom: 10
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center"
  },
  nextButtonText: {
    color: "#0F4A97",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default CompleteCustomerProfile;
