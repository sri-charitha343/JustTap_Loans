import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../../store_management/actions/actions'; // Import setUserData
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const CompleteDriverProfile = () => {
  const driverDetails = useSelector(state => state.drivers.data);
  const profilePicture = useSelector(state => state.profileImage);

  const navigation = useNavigation();
  const [validImage, setValidImage] = useState(false);

  useEffect(() => {
    if (profilePicture) {
      setValidImage(true);
    }
  }, [profilePicture]);

  const dispatch = useDispatch(); // Initialize dispatch

  const handleNext = () => {
    const userData = {
      name: driverDetails?.name || 'Not available',
      dob: driverDetails?.dob || 'Not available',
      gender: driverDetails?.gender || 'Not available',
      mobileNumber: driverDetails?.mobileNumber || 'Not available',
      email: driverDetails?.email || 'Not available',
      ridesCompleted: driverDetails?.ridesCompleted || 'Not available',
      vehicleType: driverDetails?.vehicleType || 'Not available',
      aadhar: driverDetails?.aadhar || 'Not available',
      pancard: driverDetails?.pancard || 'Not available',

    };

    dispatch(setUserData(userData)); // Dispatch the user data to the Redux store
    navigation.navigate('Processing');
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>0.0/5</Text>
        {[...Array(5)].map((_, index) => (
          <FontAwesome key={index} name="star" size={24} color="white" />
        ))}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Name: {driverDetails?.name || 'Not available'}</Text>
        <Text style={styles.detail}>DOB: {driverDetails?.dob || 'Not available'}</Text>
        <Text style={styles.detail}>Gender: {driverDetails?.gender || 'Not available'}</Text>
        <Text style={styles.detail}>Mobile: {driverDetails?.mobileNumber || 'Not available'}</Text>
        <Text style={styles.detail}>Email: {driverDetails?.email || 'Not available'}</Text>
        <Text style={styles.detail}>No. of Rides Completed: {driverDetails?.ridesCompleted || 'Not available'}</Text>
        <Text style={styles.detail}>Vehicle Type: {driverDetails?.vehicleType || 'Not available'}</Text>
        <Text style={styles.detail}>Aadhar No: {typeof driverDetails?.aadhar === 'object' ? driverDetails.aadhar.number : driverDetails?.aadhar || 'Not available'}</Text>
        <Text style={styles.detail}>PAN No: {typeof driverDetails?.pancard === 'object' ? driverDetails.pancard.number : driverDetails?.pancard || 'Not available'}</Text>
      </View>

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
    height: "50%",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  detail: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
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
export default CompleteDriverProfile;
