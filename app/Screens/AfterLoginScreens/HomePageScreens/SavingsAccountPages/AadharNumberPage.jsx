import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';


const AadharNumberPage = ({navigation}) => {


  const handleVerify = () => {
    navigation.navigate('VerifyDetailsPage'); 
  };

  return (
    <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.title}>Verify Aadhar</Text>
      <Text style={styles.subtitle}>
        Click on Verify button and go to your Digilocker
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default AadharNumberPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f4a97',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#0f4a97',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
