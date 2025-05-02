import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const LoanDocumentsPage = ({ navigation }) => {
  const documents = [
    { id: '1', title: 'KFS' },
    { id: '2', title: 'Sanction letter' },
    { id: '3', title: 'Loan agreement' }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={22} color="#000" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Loan Documents</Text>

      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

export default LoanDocumentsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 20,
    zIndex: 1,
    backgroundColor: '#0f4a97',
    padding: 10,
    borderRadius: 7,
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    marginTop: 10,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});
