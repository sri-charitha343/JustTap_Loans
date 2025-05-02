import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ActionCenter = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ActionCenter</Text>
    </SafeAreaView>
  )
}

export default ActionCenter

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})