import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { setDrivers } from "../../../store_management/actions/actions";

const BasicProfileDetailsDriver = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [aadharVerified, setAadharVerified] = useState(false);
  const [panVerified, setPanVerified] = useState(false);
  
  const driverDetails = useSelector((state) => state.drivers.data);
  console.log("Driver Details:", driverDetails);

  const verifyAadhar = () => {
    navigation.navigate("AadharOpt");
    setAadharVerified(true);
  };

  const verifyPan = () => {
    navigation.navigate("PanOpt");
    setPanVerified(true);
  };

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate("DriverLoan");
    }, 2000);
  };

  const isNextDisabled = !(aadharVerified && panVerified);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Please wait, fetching your loan details...
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.imagePlaceholder}>
            {driverDetails?.profilePicture?.path ? (
              <Image
                source={{ uri: driverDetails.profilePicture.path }}
                style={{ width: 120, height: 120, borderRadius: 60 }}
              />
            ) : (
              <Text style={styles.imageText}>No Image</Text>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>0.0/5</Text>
            {[...Array(5)].map((_, index) => (
              <FontAwesome key={index} name="star" size={24} color="white" />
            ))}
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>Name: {driverDetails?.name ?? "Not Provided"}</Text>
            <Text style={styles.detail}>DOB: {driverDetails?.dob ?? "Not Provided"}</Text>
            <Text style={styles.detail}>Gender: {driverDetails?.gender ?? "Not Provided"}</Text>
            <Text style={styles.detail}>Mobile: {driverDetails?.mobileNumber ?? "Not Provided"}</Text>
            <Text style={styles.detail}>Email: {driverDetails?.email ?? "Not Provided"}</Text>
            <Text style={styles.detail}>No. of Rides Completed: {driverDetails?.ridesCompleted ?? "Not Provided"}</Text>
            <Text style={styles.detail}>Vehicle Type: {driverDetails?.vehicleType ?? "Not Provided"}</Text>

            <View style={styles.verifyRow}>
              <Text style={styles.detail}>
                Aadhar No: {driverDetails?.aadhar?.number ?? "Not Provided"}
              </Text>
              <TouchableOpacity
                style={aadharVerified ? styles.verifiedButton : styles.verifyButton}
                onPress={verifyAadhar}
                disabled={aadharVerified}
              >
                <Text style={styles.verifyText}>
                  {aadharVerified ? "Verified" : "Verify"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.verifyRow}>
              <Text style={styles.detail}>
                PAN No: {driverDetails?.pancard?.number ?? "Not Provided"}
              </Text>
              <TouchableOpacity
                style={panVerified ? styles.verifiedButton : styles.verifyButton}
                onPress={verifyPan}
                disabled={panVerified}
              >
                <Text style={styles.verifyText}>
                  {panVerified ? "Verified" : "Verify"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.nextButton, isNextDisabled && styles.disabledButton]}
              disabled={isNextDisabled}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default BasicProfileDetailsDriver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0F4A97",
    padding: 20,
  },
  imagePlaceholder: {
    marginTop: 50,
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  imageText: {
    color: "#0F4A97",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingText: {
    color: "white",
    fontSize: 18,
    marginRight: 5,
  },
  detailsContainer: {
    width: "90%",
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  detail: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  verifyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  verifiedButton: {
    backgroundColor: "palegreen",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  verifyText: {
    color: "#0F4A97",
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  nextButtonText: {
    color: "#0F4A97",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F4A97",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
