import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../store_management/actions/actions';
import { useNavigation } from '@react-navigation/native';

const EnterDetails = ({route}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
     const {mobileNumber} = route.params || {};
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios'); // For iOS keep showing if desired
        if (selectedDate) {
            setDob(selectedDate);
        }
    };

    const handleSubmit = () => {
        if (!name.trim() || !email.trim() || !address.trim() || !gender || !dob) {
            Alert.alert('Error', 'Please fill all the fields.');
            return;
        }

        // Dispatch user data to store
        dispatch(setUserData({ name, email, address, gender, dob, mobileNumber }));

        // Navigate to CategoriesPage or another screen
        navigation.navigate('CategoriesPage');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Enter Your Details</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Select Gender</Text>
            <View style={styles.genderContainer}>
                {['Male', 'Female', 'Other'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[
                            styles.genderButton,
                            gender === item && styles.genderButtonSelected,
                        ]}
                        onPress={() => setGender(item)}
                    >
                        <Text
                            style={[
                                styles.genderText,
                                gender === item && styles.genderTextSelected,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={{ color: dob ? 'black' : '#999' }}>
                    {dob ? dob.toDateString() : 'Select your date of birth'}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={dob || new Date()}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={handleDateChange}
                />
            )}

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={4}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EnterDetails;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#0F4A97',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    label: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    genderButton: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    genderButtonSelected: {
        backgroundColor: 'white',
    },
    genderText: {
        color: 'white',
        fontSize: 16,
    },
    genderTextSelected: {
        color: '#0F4A97',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#0F4A97',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
