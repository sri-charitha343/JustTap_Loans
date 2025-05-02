import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storeStdIDNumber } from '../../../store_management/actions/actions';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

const StudentId = ({ navigation }) => {
  const [stdIDNumber, setstdIDNumber] = useState('');
  const [isstdIDValid, setIsstdIDValid] = useState(false);
  const [goPressed, setGoPressed] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Simple check: stdID must be 10 characters
  const handlestdIDChange = (text) => {
    const upperCaseText = text.toUpperCase();
    setstdIDNumber(upperCaseText);
    setIsstdIDValid(upperCaseText);
    setGoPressed(false);
  };

  const handleGoPress = () => {
    dispatch(storeStdIDNumber(stdIDNumber));
    setGoPressed(true);
    Keyboard.dismiss();
  };

  const handleTakePanImage = () => {
  
      navigation.navigate('StudentIdUpload');
   
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Upload Student ID Card</Text>
        <Text style={styles.text}>
          Enter your Student ID card number for verification.
        </Text>

        <Image
          source={require('../../../../assets/Images/StudentId2.jpg')}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter stdID Number"
            value={stdIDNumber}
            onChangeText={handlestdIDChange}
            keyboardType="default"
          />
          <TouchableOpacity
            style={[styles.goButton, isstdIDValid && styles.goButtonActive]}
            onPress={handleGoPress}
            disabled={!isstdIDValid}
          >
            <Text style={styles.goButtonText}>Go</Text>
          </TouchableOpacity>
        </View>

         <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleTakePanImage}>
                  <Text style={styles.buttonText}>Take Student Id Image</Text>
                </TouchableOpacity>

                </View>

       
         
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  title: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 270,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  goButton: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  goButtonActive: {
    backgroundColor: 'yellow',
  },
  goButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 50,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StudentId;
