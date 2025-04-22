import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const CategoriesPage = () => {
  const [categorySelected, setCategorySelected] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

   const getEligibleAmount = (category) => {
      switch (category) {
        case 'student':
          return 10000;
        case 'employee':
          return 20000;
        case 'self-employed':
          return 15000;
        default:
          return 0;
      }
    };

  const handleSelectCategory = (category) => {
    setCategorySelected(category);
    
   
    const loanAmount = getEligibleAmount(category);
    dispatch({
      type: 'SET_SELECTED_CATEGORY',
      payload: { category, loanAmount },
    });
    console.log('Selected Category:', category);
    console.log('Loan Amount:', loanAmount);
    
    navigation.navigate('BasicProfileDetailsCustomer'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Your Category</Text>
      <View style={styles.categoryContainer}>
        {['student', 'employee', 'self-employed'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={styles.categoryBox}
            onPress={() => handleSelectCategory(cat)}
          >
            <Text style={styles.categoryText}>
              {cat === 'student' && '🎓 '}
              {cat === 'employee' && '👔 '}
              {cat === 'self-employed' && '💼 '}
              {cat.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CategoriesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryContainer: {
    width: '100%',
    gap: 12,
  },
  categoryBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#333',
  },
});
