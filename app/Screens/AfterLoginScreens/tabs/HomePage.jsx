import { ScrollView, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import DiffLoans from '../../Customer/DiffLoans'; 
import { useNavigation } from '@react-navigation/native'; 

const HomePage = () => {
  const [userType, setUserType] = useState('customer'); // 'customer' or 'driver'
  const profileImage = useSelector(state => state.profileImage);
  const navigation = useNavigation(); 

  // Navigate to the profile page
  const handleProfilePress = () => {
    navigation.navigate('ProfilePage'); 
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={30} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

       
        <View>
          <MaterialIcons name="support-agent" size={45} color="#0F4A97" left={-50} />
        </View>

        <View style={styles.checkBalanceBox}>
          <Text style={styles.checkBalanceText}>Check Balance</Text>
        </View>
      </View>

      {/* Conditional Content Rendering */}
      {userType === 'customer' ? (
        <DiffLoans /> // Content for Customer
        
      ) : (
        <Text style={styles.text}>Welcome Driver</Text> // Content for Driver
      )}
      <View style={styles.bottomcontainer}>
        <View style={styles.inrow}>
          <TouchableOpacity style={styles.overview} onPress={() => navigation.navigate('NextScreen')}>
            <Text style={styles.overviewText}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.overview}></TouchableOpacity>
        </View>
              <TouchableOpacity style={styles.friends} onPress={() => navigation.navigate('NextScreen')}>
                <Text style={styles.friendsText}>Invite Friends get bonus</Text></TouchableOpacity>
            </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 35,
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconContainer: {
    backgroundColor: '#0F4A97',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderColor: '#0F4A97',
    borderWidth: 3,
  },
  checkBalanceBox: {
    backgroundColor: '#0F4A97',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkBalanceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomcontainer: {
    padding: 15,
    borderRadius: 15,
    height: 210,
    backgroundColor: '#f0f8ff',    
  },
  friends: {
    backgroundColor: '#cbe2f5',
    paddingVertical: 20,
    alignItems: 'center',
  },
  overview: {
    backgroundColor: '#cbe2f5',
    height: 100,
    width: 140,
    borderRadius:10,
    padding:20,
  },
  inrow: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingBottom: 10,
  },
  overviewText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
  },
  friendsText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
