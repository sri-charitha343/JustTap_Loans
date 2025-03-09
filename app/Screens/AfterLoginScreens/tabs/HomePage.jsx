import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DiffLoans from '../../Customer/DiffLoans'; // Adjust the import path as necessary

const HomePage = () => {
  const userType = 'customer'; // This should be dynamically set based on your app's logic

  return (
    <ScrollView style={styles.container}>
     {userType === 'customer' ? <DiffLoans /> : <Text style={styles.text}>Welcome Driver</Text>}
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:35, 
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
  },
  
});
