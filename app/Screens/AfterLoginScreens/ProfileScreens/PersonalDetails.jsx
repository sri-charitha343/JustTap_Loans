import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAadharData } from '../../../store_management/actions/aadharActions';
import { getPanData } from '../../../store_management/actions/panActions';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PersonalDetails = () => {


    const navigation = useNavigation();
    const user = useSelector(state => state.userData);
    const aadharData = useSelector(state => state.aadharData);
    const panData = useSelector(state => state.panData);

    const userType = user?.userType;
    const [openDropdown, setOpenDropdown] = useState(null);
    console.log("Current userData from Redux:", user);
    console.log("Extracted userType:", user?.userType);

    console.log(user);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Back Arrow Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#0F4A97" />
            </TouchableOpacity>

            <Text style={styles.heading}>Personal Details</Text>

            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Name: {user?.name}</Text>
                <Text style={styles.label}>Email: {user?.email}</Text>
                <Text style={styles.label}>Mobile: {user?.mobileNumber}</Text>
                <Text style={styles.label}>DOB: {user?.dob || 'Not provided'}</Text>
                <Text style={styles.label}>Gender: {user?.gender || 'Not provided'}</Text>

                {user === 'driver' && <Text style={styles.label}>Vehicle Type: {user?.vehicleType}</Text>}
            </View>

            <Text style={styles.sectionHeading}>Documents</Text>

            {/* Aadhar Section */}
            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('aadhar')}>
                <Text style={styles.dropdownText}>Aadhar</Text>
                <Ionicons name={openDropdown === 'aadhar' ? "chevron-up" : "chevron-down"} size={20} color="white" />
            </TouchableOpacity>
            {openDropdown === 'aadhar' && (
                <View style={styles.documentContainer}>
                    <Text style={styles.label}>Aadhar Number: { user?.aadhar?.number || 'Not provided'}</Text>

                    {/* <Text style={styles.label}>Aadhar Number: {user?.aadhar || 'Not provided'}</Text> */}
                    {user?.aadhar?.frontImage?.path ? (
                        <Image source={{ uri: user.aadhar.frontImage.path }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholder}><Text>No Front Image</Text></View>
                    )}

                    {user?.aadhar?.backImage?.path ? (
                        <Image source={{ uri: user.aadhar.backImage.path }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholder}><Text>No Back Image</Text></View>
                    )}
                </View>
            )}

            {/* PAN Section */}
            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('pan')}>
                <Text style={styles.dropdownText}>PAN Card</Text>
                <Ionicons name={openDropdown === 'pan' ? "chevron-up" : "chevron-down"} size={20} color="white" />
            </TouchableOpacity>
            {openDropdown === 'pan' && (
                <View style={styles.documentContainer}>
                    <Text style={styles.label}>PAN Number: {user?.pancard?.number || 'Not provided'}</Text>
                    {/* <Text style={styles.label}>Aadhar Number: {user?.pancard || 'Not provided'}</Text> */}


                    {user?.pancard?.frontImage?.path ? (
                        <Image source={{ uri: user.pancard.frontImage.path }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholder}><Text>No Front Image</Text></View>
                    )}

                    {user?.pancard?.backImage?.path ? (
                        <Image source={{ uri: user.pancard.backImage.path }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholder}><Text>No Back Image</Text></View>
                    )}
                </View>
                
            )}
            <View style={styles.bottom}></View>
        </ScrollView>
     );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop:30,
        backgroundColor: '#f8f9fa',
        
    },
    backButton: {
        position: 'absolute',
        marginTop: 10,
        left: 15,
        zIndex: 10,
        border: '#0F4A97',
        borderWidth: 2,
        padding: 5,
        borderColor: '#0F4A97'
    },
    heading: {
        marginTop: 60,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0F4A97',
        marginBottom: 10,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0F4A97',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    dropdownText: {
        color: '#fff',
        fontSize: 16,
    },
    documentContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginTop: 10,
    },
    placeholder: {
        width: '100%',
        height: 150,
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 5,
    },
    bottom:{paddingBottom: 40}
});

export default PersonalDetails;