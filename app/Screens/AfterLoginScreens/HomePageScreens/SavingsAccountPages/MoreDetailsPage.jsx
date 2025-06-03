import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const employmentTypes = [
  'Salaried',
  'Self Employed',
  'Student',
  'Retired',
  'Not Employed',
];

const incomeRanges = [
  'Less than 1 Lakh',
  '1 - 5 Lakhs',
  '5 - 10 Lakhs',
  '10 - 15 Lakhs',
  '15 - 20 Lakhs',
  '20 - 50 Lakhs',
  'Above 50 Lakhs',
];

const MoreDetailsPage = ({navigation}) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedIncome, setSelectedIncome] = useState('');

  return (
    <ScrollView styles={{backgroundColor:'white'}}>
    <View
      style={styles.container}
    >
      <Text style={styles.heading}>Employment Type</Text>

      <View style={styles.boxContainer}>
        {employmentTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedType(type)}
            activeOpacity={0.85}
            style={[
              styles.box,
              selectedType === type && styles.selectedBox,
            ]}
          >
            <Text
              style={[
                styles.boxText,
                selectedType === type && styles.selectedBoxText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.heading}>Annual Income</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedIncome}
          onValueChange={(itemValue) => setSelectedIncome(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Income Range" value="" />
          {incomeRanges.map((range) => (
            <Picker.Item key={range} label={range} value={range} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={() => {navigation.navigate('AadharNumberPage')}}>
        <LinearGradient
          colors={['#0f4a97', '#0a3570']}
          style={styles.continueGradient}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default MoreDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f4a97',
    marginBottom: 14,
    marginTop: 25,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  box: {
    width: width * 0.65,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#f0f6fd',
    borderWidth: 1.5,
    borderColor: '#d0e3fb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  selectedBox: {
    backgroundColor: '#0f4a97',
    borderColor: '#0a3570',
  },
  boxText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f4a97',
  },
  selectedBoxText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  dropdownContainer: {
    backgroundColor: '#f0f6fd',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#d0e3fb',
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 30,
  },
  picker: {
    height: Platform.OS === 'android' ? 50 : 180,
    color: '#0f4a97',
  },
  continueButton: {
    marginTop: 'auto',
  },
  continueGradient: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
});
