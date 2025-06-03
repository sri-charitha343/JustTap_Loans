import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const Security = () => {
  const navigation = useNavigation();
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const securityOptions = [
    { id: '1', title: 'Change PIN', action: () => navigation.navigate('ChangePin') },
  ];

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="#0F4A97" />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Settings</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Enable Biometric Authentication</Text>
          <Switch
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
            trackColor={{ false: '#767577', true: '#0F4A97' }}
            thumbColor={biometricEnabled ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#0F4A97' }}
            thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Security</Text>
        
        {securityOptions.map(option => (
          <TouchableOpacity key={option.id} style={styles.optionItem} onPress={option.action}>
            <Text style={styles.optionText}>{option.title}</Text>
            <FontAwesome name="chevron-right" size={16} color="#0F4A97" />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Log Out')}>
        <Text style={styles.logoutButtonText}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left:10,
    padding:5,
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#0F4A97',
    borderRadius:5
  },
  section: {
    marginTop: 80,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#0F4A97',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 10,
    width: '100%',
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Security;
