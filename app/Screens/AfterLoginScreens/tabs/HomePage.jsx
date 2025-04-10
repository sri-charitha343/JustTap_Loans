import { ScrollView, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import DiffLoans from '../../Customer/DiffLoans';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
 


const HomePage = () => {

 
  const profileImage = useSelector(state => state.profileImage);
  const navigation = useNavigation();
   const userType = useSelector((state) => state.userType);
   console.log("user type:",userType);
  // Navigate to the profile page
  const handleProfilePress = () => {
    navigation.navigate('ProfilePage');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
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

        <TouchableOpacity onPress={()  => navigation.navigate('HelpPage')}>
          <MaterialIcons name="support-agent" size={45} color="#0F4A97" right={0} />
        </TouchableOpacity>

      </View>


      {userType === 'customer' ? (
        <View>
          <DiffLoans />
          </View>
      ) : (

        <View style={styles.driverContent}>
          <Text style={styles.text}>Welcome, Driver</Text>
          
        </View>
      )}
       <View style={styles.bottomcontainer}>
            <View style={styles.inrow}>
              <View styles={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: 20,
              }}>
                <TouchableOpacity
                  style={styles.overview}
                  onPress={() => navigation.navigate('OverView')}
                >
                  <Icon name="piechart" size={40} color="white" />
                </TouchableOpacity>

                <Text style={styles.overviewText}>Overview</Text>
              </View>
              <View styles={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: 20,
              }}>
                <TouchableOpacity
                  style={styles.overview}
                  onPress={() => navigation.navigate('Cards')}
                >
                  <Icon name="creditcard" size={40} color="white" />
                </TouchableOpacity>

                <Text style={styles.overviewText}>Cards</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.friends} onPress={() => navigation.navigate('InviteFriends')}>
              <Text style={styles.friendsText}>Invite Friends get bonus</Text>
            </TouchableOpacity>
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
  driverText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
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
  bottomcontainer: {
    padding: 15,
    borderRadius: 15,
    height: 210,
    marginBottom: 100
  },
  friends: {
    backgroundColor: '#0f4a97',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10
  },
  overview: {
    backgroundColor: '#0f4a97',
    height: 100,
    width: 140,
    borderRadius: 10,
    padding: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  inrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  overviewText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    fontWeight:'bold',
    textAlign:'center'
  },
  friendsText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  driverContent: {
    marginVertical: 20,
    alignItems: 'center',
  },
  driverButton: {
    backgroundColor: '#0F4A97',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  driverButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
