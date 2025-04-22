import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomCheckBox = ({ isChecked, onToggle }) => {
    return (
        <TouchableOpacity onPress={onToggle} style={styles.termsRow}>
            <MaterialIcons
                name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color={isChecked ? '#007B55' : '#ccc'}
            />
            <Text style={styles.termsText}>I agree to the Terms and Conditions</Text>
        </TouchableOpacity>
    );
};

const UserDetailsPage = () => {
    const navigation = useNavigation();
    const [agree, setAgree] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        selfie: null,
        address: '',
        addressProofId: '',
        idFront: null,
        idBack: null,
        pan: '',
        panImage: null,
    });

    const openCamera = (field, initialCameraView) => {
        navigation.navigate('CameraCapturePage', {
            initialCameraView,
            onCapture: (image) =>
                setFormData((prev) => ({ ...prev, [field]: image })),
        });
    };

    useEffect(() => {
        const allFilled = Object.values(formData).every((value) => value && value !== '');
        setIsFormValid(allFilled && agree);
    }, [formData, agree]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Fill The Details For Further Processing</Text>

            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} placeholder="John Doe" value={formData.name} onChangeText={text => setFormData({ ...formData, name: text })} />

            {/* DOB */}
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput style={styles.input} placeholder="DD/MM/YYYY" value={formData.dob} onChangeText={text => setFormData({ ...formData, dob: text })} />

            {/* Live Selfie */}
            <Text style={styles.label}>Live Selfie</Text>
            {formData.selfie ? (
                <Image source={{ uri: formData.selfie }} style={styles.imageBox} />
            ) : (
                <TouchableOpacity style={styles.cameraBox} onPress={() => openCamera('selfie', 'front')}>
                    <Icon name="photo-camera" size={40} color="#999" />
                    <Text style={styles.cameraText}>Take Selfie</Text>
                </TouchableOpacity>
            )}

            {/* Address */}
            <Text style={styles.label}>Address</Text>
            <TextInput style={[styles.input, { height: 80 }]} multiline value={formData.address} onChangeText={text => setFormData({ ...formData, address: text })} />

            {/* Address Proof */}
            <Text style={styles.label}>Address Proof (Govt ID)</Text>
            <TextInput style={styles.input} placeholder="Aadhar/ID Number" value={formData.addressProofId} onChangeText={text => setFormData({ ...formData, addressProofId: text })} />
            <View style={styles.dualRow}>
                <View style={styles.subBox}>
                    <Text style={styles.subLabel}>Front</Text>
                    {formData.idFront ? (
                        <Image source={{ uri: formData.idFront }} style={styles.imageBoxSmall} />
                    ) : (
                        <TouchableOpacity style={styles.cameraBoxSmall} onPress={() => openCamera('idFront', 'back')}>
                            <Icon name="photo-camera" size={28} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.subBox}>
                    <Text style={styles.subLabel}>Back</Text>
                    {formData.idBack ? (
                        <Image source={{ uri: formData.idBack }} style={styles.imageBoxSmall} />
                    ) : (
                        <TouchableOpacity style={styles.cameraBoxSmall} onPress={() => openCamera('idBack', 'back')}>
                            <Icon name="photo-camera" size={28} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* PAN */}
            <Text style={styles.label}>PAN Number</Text>
            <TextInput style={styles.input} placeholder="ABCDE1234F" value={formData.pan} onChangeText={text => setFormData({ ...formData, pan: text })} />
            {formData.panImage ? (
                <Image source={{ uri: formData.panImage }} style={styles.imageBox} />
            ) : (
                <TouchableOpacity style={styles.cameraBox} onPress={() => openCamera('panImage', 'back')}>
                    <Icon name="photo-camera" size={40} color="#999" />
                    <Text style={styles.cameraText}>Upload PAN</Text>
                </TouchableOpacity>
            )}

            {/* Terms & Conditions */}
            <CustomCheckBox isChecked={agree} onToggle={() => setAgree(!agree)} />

            {/* Continue Button */}
            <TouchableOpacity
                style={[styles.continueBtn, { backgroundColor: isFormValid ? '#007B55' : '#aaa' }]}
                disabled={!isFormValid}
                onPress={() => navigation.navigate('BankDetailsPage' )}
            >
                <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 18,
        marginTop: 25,
        backgroundColor: '#f7f9fc',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#0f4a97',
    },
    label: {
        fontSize: 15,
        marginTop: 12,
        fontWeight: '600',
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#fff',
        marginTop: 6,
    },
    cameraBox: {
        height: 170,
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        borderRadius: 12,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
    },
    cameraText: {
        fontSize: 14,
        color: '#888',
        marginTop: 6,
    },
    imageBox: {
        height: 170,
        width: '100%',
        borderRadius: 12,
        marginTop: 10,
    },
    dualRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    subBox: {
        width: '48%',
    },
    subLabel: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '500',
    },
    cameraBoxSmall: {
        height: 100,
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
    },
    imageBoxSmall: {
        height: 100,
        width: '100%',
        borderRadius: 10,
    },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    termsText: {
        marginLeft: 10,
        flex: 1,
        fontSize: 14,
        color: '#444',
    },
    continueBtn: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        elevation: 2,
        marginBottom: 100
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default UserDetailsPage;
