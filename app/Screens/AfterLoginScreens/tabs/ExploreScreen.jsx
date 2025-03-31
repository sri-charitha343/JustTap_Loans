import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const ExploreScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.Title}>Explore</Text>
      </View>
{/* <ImageBackground source={require()}></ImageBackground> */}
      <Image source={require('../../../../assets/Images/rewards.jpeg')}/>
    </SafeAreaView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  Title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e3a8a',
    alignContent: 'center',
    padding: 42,
  },
});