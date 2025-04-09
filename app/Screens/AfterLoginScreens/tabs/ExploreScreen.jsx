import { SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

const ExploreScreen = ({navigation}) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.card} onPress ={() => navigation.navigate('AllTransactions')}>
          <LinearGradient colors={['#6EE7B7', '#3B82F6']} style={styles.gradient}>
            <FontAwesome5 name="money-bill-wave" size={50} color="#fff" />
            <Text style={styles.cardTitle}>{currentMonth} Spendings</Text>
            <Text style={styles.cardAmount}>₹0</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <LinearGradient colors={['#FACC15', '#FB923C']} style={styles.gradient}>
            <MaterialIcons name="credit-score" size={50} color="#fff" />
            <Text style={styles.cardTitle}>Credit Score</Text>
            <Text style={styles.cardAmount}>0</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <LinearGradient colors={['#EF4444', '#F59E0B']} style={styles.gradient}>
            <Ionicons name="gift-outline" size={50} color="#fff" />
            <Text style={styles.cardTitle}>Rewards</Text>
            <Text style={styles.cardText}>Check your earned rewards here!</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('InviteFriends')} style={styles.card}>
          <LinearGradient colors={['#EC4899', '#8B5CF6']} style={styles.gradient}>
            <Feather name="user-plus" size={50} color="#fff" />
            <Text style={styles.cardTitle}>Invite Your Friends</Text>
            <Text style={styles.cardText}>Earn rewards when your friends join!</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 40,
    marginTop: '15%',
    fontWeight: 'bold',
    color: '#0f4a97',
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  card: {
    width: 275,
    height: 500,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 15,
    margin: 5,
  },
  gradient: {
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  cardAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
