import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setPanVerified } from "../../../store_management/actions/panActions"; 



const PanOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const verifyOtp = async () => {
    if (otp === "123456") {
      // Update verification status in Redux
      dispatch(setPanVerified(true));

      Alert.alert("Verified", "PAN Verified Successfully");

      navigation.goBack()

    } else {
      Alert.alert("Error", "Invalid OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify PAN Number</Text>
      <TextInput 
        style={styles.otpInput} 
        placeholder="Enter 6-digit OTP" 
        keyboardType="numeric" 
        maxLength={6} 
        value={otp} 
        onChangeText={setOtp} 
      />
      <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PanOtp;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0F4A97" },
  title: { fontSize: 24, color: "white", marginBottom: 20 },
  otpInput: { width: "80%", backgroundColor: "white", padding: 10, borderRadius: 5, fontSize: 18, textAlign: "center", marginBottom: 15 },
  verifyButton: { backgroundColor: "white", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  buttonText: { color: "#0F4A97", fontSize: 18, fontWeight: "bold" },
});
