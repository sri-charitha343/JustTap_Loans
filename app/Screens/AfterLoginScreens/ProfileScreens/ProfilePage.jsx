import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome,Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.userData);
  const userType = useSelector((state) => state.userType);
  const profileImage = useSelector((state) => state.profileImage);

  const menuItems = [
    { id: '1', title: 'Action Center', screen: 'ActionCenter' },
    { id: '2', title: 'UPISetting', screen: 'UPISetting' },
    { id: '3', title: 'Personal Details', screen: 'PersonalDetails' },
    { id: '4', title: 'Security', screen: 'Security' },
    { id: '5', title: 'Pricing', screen: 'Pricing' },
    { id: '6', title: 'Help and Support', screen: 'HelpAndSupport' },
    { id: '7', title: 'UPI Safety Guidelines', screen: 'UPISafetyGuidelines' },
    { id: '8', title: 'About Us', screen: 'AboutUs' },
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Text style={styles.menuText}>{item.title}</Text>
      <FontAwesome name="chevron-right" size={20} color="#333" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Home Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
          <FontAwesome name="home" size={30} color="#0f4a97" />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      {profileImage ? (
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
        />
      ) : (
        <View style={styles.profilePlaceholder}>
          <Text style={styles.profileText}>No Image</Text>
        </View>
      )}

      {/* Name */}
      <Text style={styles.name}>
        {userData?.name || 'Name not available'}
      </Text>
      <Text style={styles.MobileNumber}>+91 {userData?.mobileNumber}</Text>

      {/* Stats - Customer */}
      {userType === 'customer' && (
        <View style={styles.statsContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Rating: {userData?.customers?.data?.rating ?? 'N/A'}/5</Text>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome
                  key={index}
                  name="star"
                  size={16}
                  color={index < userData?.customers?.data?.rating ? '#FFD700' : '#ccc'}
                />
              ))}
            </View>
          </View>

          <View style={styles.ridesContainer}>
            <Text style={styles.ridesText}>Rides Taken</Text>
            <Text style={styles.ridesCount}>
              {userData?.customers?.data?.ridesTaken ?? 0}
            </Text>
          </View>
        </View>
      )}

      {/* Stats - Driver */}
      {userType === 'driver' && (
        <View style={styles.statsContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Rating: {userData?.drivers?.data?.rating ?? 'N/A'}/5</Text>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome
                  key={index}
                  name="star"
                  size={16}
                  color={index < userData?.drivers?.data?.rating ? '#FFD700' : '#ccc'}
                />
              ))}
            </View>
          </View>

          <View style={styles.ridesContainer}>
            <Text style={styles.ridesText}>Rides Completed</Text>
            <Text style={styles.ridesCount}>
              {userData?.drivers?.data?.ridesCompleted ?? 0}
            </Text>
          </View>
        </View>
      )}

      {/* Menu Items */}
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        style={styles.menuList}
      />
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 20,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0F4A97',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  profileText: {
    color: '#fff',
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  MobileNumber: {
    fontSize: 17,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ridesContainer: {
    alignItems: 'center',
  },
  ridesText: {
    fontSize: 16,
    marginBottom: 5,
  },
  ridesCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuList: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
