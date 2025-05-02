import { FlatList, SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

const Pricing = () => {

  const data = [
    { id: 1, title: 'Savings' },
    { id: 2, title: 'Borrow' },
    { id: 3, title: 'Prepaid' },
    { id: 4, title: 'Deposits' },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Pricing</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Pricing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 4,
  },
  itemContainer: {
    width: 250,
    backgroundColor: '#d0e8ff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '500',
  },
})
