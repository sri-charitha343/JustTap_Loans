import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const Cards = ({navigation}) => {
  const [cardType, setCardType] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [cardsList, setCardsList] = useState([]);

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const rainbowGradients = [
    ['#8B0000', '#B22222'], // Dark Red
    ['#FF8C00', '#FF4500'], // Dark Orange
    ['#CCCC00', '#999900'], // Dark Yellow
    ['#006400', '#228B22'], // Dark Green
    ['#00008B', '#0000CD'], // Dark Blue
    ['#4B0082', '#6A5ACD'], // Indigo
    ['#800080', '#9932CC'], // Violet
  ];

  const allFieldsFilled = cardType && cardHolderName && cardNumber && day && year;

  const formatCardNumber = (number) => {
    const digitsOnly = number.replace(/\D/g, '').slice(0, 12);
    return digitsOnly.replace(/(.{4})/g, '$1 ').trim();
  };

  const maskCardNumber = (number) => {
    const digits = number.replace(/\D/g, '');
    const last4 = digits.slice(-4);
    return `**** **** ${last4}`;
  };

  const handleAddCard = () => {
    const newCard = {
      cardType,
      cardHolderName,
      cardNumber,
      day,
      year,
    };

    setCardsList([...cardsList, newCard]);

    // Reset form fields
    setCardType('');
    setCardHolderName('');
    setCardNumber('');
    setDay('');
    setYear('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                      <Icon name="arrow-back" size={28} color="white" />
                  </TouchableOpacity>
      <View style={styles.header}>
      <Text style={styles.label}>Select a card type:</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={cardType} onValueChange={setCardType}>
          <Picker.Item label="Select card type" value="" />
          <Picker.Item label="Credit Card" value="credit" />
          <Picker.Item label="Debit Card" value="debit" />
        </Picker>
      </View>

      {cardType ? (
        <View style={styles.fieldsWrapper}>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter card holder name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />

          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
            maxLength={14} // includes 2 spaces
          />

          <Text style={styles.label}>Expiry Date (MM/YY)</Text>
          <View style={styles.row}>
            <View style={[styles.pickerWrapper, { flex: 1, marginRight: 10 }]}>
              <Picker selectedValue={day} onValueChange={setDay}>
                <Picker.Item label="Day" value="" />
                {days.map((d) => (
                  <Picker.Item key={d} label={d} value={d} />
                ))}
              </Picker>
            </View>

            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Year"
              keyboardType="numeric"
              value={year}
              onChangeText={setYear}
              maxLength={4}
            />
          </View>
        </View>
      ) : null}

      {allFieldsFilled && (
        <TouchableOpacity style={styles.button} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
      )}

      {/* Display Cards */}
      {cardsList.map((card, index) => {
        const gradientColors = rainbowGradients[index % rainbowGradients.length];
        return (
          <LinearGradient
            key={index}
            colors={gradientColors}
            style={styles.cardDisplay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.cardTypeText}>
              {card.cardType === 'credit' ? 'CREDIT CARD' : 'DEBIT CARD'}
            </Text>
            <Text style={styles.cardNumberText}>{maskCardNumber(card.cardNumber)}</Text>
            <View style={styles.cardDetailsRow}>
              <View>
                <Text style={styles.smallLabel}>Card Holder</Text>
                <Text style={styles.cardText}>{card.cardHolderName}</Text>
              </View>
              <View>
                <Text style={styles.smallLabel}>Expires</Text>
                <Text style={styles.cardText}>
                  {card.day.padStart(2, '0')}/{card.year.slice(-2)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        );
      })}
      </View>
    </ScrollView>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    padding:5,
    borderRadius: 10,
    backgroundColor:'#0f4a97',
    left: 5,
    zIndex: 10
},
header:{
  marginTop: "20%"
},
  fieldsWrapper: {
    marginTop: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 17,
    borderRadius: 8,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardDisplay: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardTypeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  cardNumberText: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  smallLabel: {
    color: '#eee',
    fontSize: 12,
  },
});
