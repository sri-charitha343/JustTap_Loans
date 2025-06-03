import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Touchable } from 'react-native';
import { MaterialIcons, Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function UPISetting({navigation}) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={{ padding:20 }}>
      <View style={styles.headerRow}>
    <TouchableOpacity onPress={() => {navigation.goBack()}}>
      <Ionicons name="arrow-back"  size={24} color="#0f4a97" />
    </TouchableOpacity>
    <Text style={styles.pageTitle}>UPI Settings</Text>
  </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>UPI ID</Text>
          
        </View>
        <View style={[styles.iconRow, { backgroundColor: '#F0F6FF' }]}>
          <View style={[styles.iconCircle, { backgroundColor: '#0f4a97' }]}>
            <MaterialIcons name="verified-user" size={20} color="#fff" />
          </View>
          <TouchableOpacity onPress={() => {navigation.navigate('QRCodePage')}}>
            <Text style={styles.subText}>Your Primary UPI ID</Text>
            <Text style={styles.mainText}>9121978725@jus</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Bank Account</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Manage</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.accountCard}>
          <View style={styles.accountRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#E0ECFF' }]}>
              <Ionicons name="business" size={20} color="#0f4a97" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainText}>SBI Bank</Text>
              <Text style={styles.subText}>Primary Account</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editText}>Details</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.balanceButton}>
            <Text style={styles.editText}>Check Balance</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addAccountButton}>
          <AntDesign name="plus" size={18} color="#0f4a97" style={{ marginRight: 8 }} />
          <Text style={[styles.editText, { color: '#0f4a97' }]}>Add Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Cards</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Add New</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cardRow}>
          <LinearGradient colors={['#a2c7f8', '#0f4a97']} style={styles.iconCircle}>
            <Feather name="credit-card" size={18} color="#fff" />
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.mainText}>Credit Card</Text>
            <Text style={styles.subText}>Manage your credit cards</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardRow}>
          <LinearGradient colors={['#b0d8f1', '#0f4a97']} style={styles.iconCircle}>
            <Feather name="credit-card" size={18} color="#fff" />
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.mainText}>Debit Card</Text>
            <Text style={styles.subText}>Manage your debit cards</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    marginTop: hp(5),
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: hp(3),
},
  pageTitle: {
  fontSize: hp(2.6),
  fontWeight: 'bold',
  color: '#0f4a97',
  marginLeft: wp(3),
},

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: wp(4),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  cardTitle: {
    fontSize: hp(2.2),
    fontWeight: '600',
    color: '#0f4a97',
  },
  editText: {
    fontSize: hp(1.8),
    color: '#0f4a97',
    fontWeight: '500',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
    borderRadius: 10,
  },
  iconCircle: {
    padding: wp(2),
    borderRadius: 50,
    marginRight: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    fontSize: hp(1.5),
    color: '#6B7280',
  },
  mainText: {
    fontSize: hp(1.8),
    color: '#1F2937',
    fontWeight: '600',
  },
  accountCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
  },
  balanceButton: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingVertical: wp(3),
    alignItems: 'center',
  },
  addAccountButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F0F6FF',
    padding: wp(3),
    marginTop: hp(1.5),
    borderRadius: 10,
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: wp(3),
    marginBottom: hp(1),
  },
});
