import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AfterProcessingPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [approved, setApproved] = useState('approved');


  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MainTabs');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: approved ? '#e6ffe6' : '#ffe6e6' }]}>
      <Text style={[styles.text, { color: approved ? '#2e7d32' : '#c62828' }]}>
        {approved ? '🎉 Congratulations!' : '😞 We\'re Sorry!'}
      </Text>
      <Text style={styles.subText}>
        {approved
          ? 'Your loan has been approved!'
          : 'Unfortunately, your loan was not approved this time.'}
      </Text>
    </View>
  );
};

export default AfterProcessingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});
