import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PersonalDetails = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const user = useSelector(state => state.userData);
    const userType = useSelector(state => state.userType);
    const getImageUrl = (filename) => `http://192.168.29.232:3002/uploads/${filename}`;

    const aadharFrontImage = useSelector(state => state.aadharFrontImage);
    const aadharBackImage = useSelector(state => state.aadharBackImage);
    const panFrontImage = useSelector(state => state.panFrontImage);
    const panBackImage = useSelector(state => state.panBackImage);

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const renderLabel = (title, value) => (
        <Text style={styles.label}>
            <Text style={styles.labelTitle}>{title}</Text> {value}
        </Text>
    );

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#0F4A97" />
            </TouchableOpacity>

            <Text style={styles.heading}>Personal Details</Text>

            {userType === 'driver' ? (
                <>
                    <View style={styles.detailsContainer}>
                        {renderLabel('Name:', user?.name)}
                        {renderLabel('Email:', user?.email)}
                        {renderLabel('Mobile:', user?.mobileNumber)}
                        {renderLabel('DOB:', user?.dateOfBirth || 'Not provided')}
                        {renderLabel('Gender:', user?.gender || 'Not provided')}
                        {renderLabel('Vehicle Type:', user?.vehicleType || 'Not provided')}
                        {renderLabel('Current Address:', '48 - 320, Siri\'s Sri Nilayam, Ganesh Nagar, Chintal, Hyderabad, Telangana 500054')}
                        {renderLabel('Permanent Address:', '48 - 320, Siri\'s Sri Nilayam, Ganesh Nagar, Chintal, Hyderabad, Telangana 500054')}
                    </View>

                    <Text style={styles.sectionHeading}>Documents</Text>

                    <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('aadhar')}>
                        <Text style={styles.dropdownText}>Aadhar</Text>
                        <Ionicons name={openDropdown === 'aadhar' ? "chevron-up" : "chevron-down"} size={20} color="white" />
                    </TouchableOpacity>
                    {openDropdown === 'aadhar' && (
                        <View style={styles.documentContainer}>
                            {renderLabel('Aadhar Number:', user?.aadhar?.number || 'Not provided')}
                            {user?.aadhar?.frontImage?.path ? (
                                <Image source={{ uri: getImageUrl(user.aadhar.frontImage.filename) }} style={styles.image} />
                            ) : (
                                <View style={styles.placeholder}><Text>No Front Image</Text></View>
                            )}
                            {user?.aadhar?.backImage?.path ? (
                                <Image source={{ uri: getImageUrl(user.aadhar.backImage.filename) }} style={styles.image} />
                            ) : (
                                <View style={styles.placeholder}><Text>No Back Image</Text></View>
                            )}
                        </View>
                    )}

                    <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('pan')}>
                        <Text style={styles.dropdownText}>PAN Card</Text>
                        <Ionicons name={openDropdown === 'pan' ? "chevron-up" : "chevron-down"} size={20} color="white" />
                    </TouchableOpacity>
                    {openDropdown === 'pan' && (
                        <View style={styles.documentContainer}>
                            {renderLabel('PAN Number:', user?.pancard?.number || 'Not provided')}
                            {user?.pancard?.image?.path ? (
                                <Image source={{ uri: getImageUrl(user.pancard.image.filename) }} style={styles.image} />
                            ) : (
                                <View style={styles.placeholder}><Text>No Front Image</Text></View>
                            )}
                        </View>
                    )}
                </>
            ) : (
                <>
                    <View style={styles.detailsContainer}>
                        {renderLabel('Name:', user?.name)}
                        {renderLabel('Email:', user?.email)}
                        {renderLabel('Mobile:', user?.mobileNumber)}
                        {renderLabel('DOB:', user?.dob || 'Not provided')}
                        {renderLabel('Gender:', user?.gender || 'Not provided')}
                        {renderLabel('Current Address:', '48 - 320, Siri\'s Sri Nilayam, Ganesh Nagar, Chintal, Hyderabad, Telangana 500054')}
                        {renderLabel('Permanent Address:', '48 - 320, Siri\'s Sri Nilayam, Ganesh Nagar, Chintal, Hyderabad, Telangana 500054')}
                    </View>

                    <Text style={styles.sectionHeading}>Documents</Text>

                    <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('aadhar')}>
                        <Text style={styles.dropdownText}>Aadhar</Text>
                        <Ionicons name={openDropdown === 'aadhar' ? "chevron-up" : "chevron-down"} size={20} color="white" />
                    </TouchableOpacity>
                    {openDropdown === 'aadhar' && (
                        <View style={styles.documentContainer}>
                            {renderLabel('Aadhar Number:', user?.aadhar || 'Not provided')}
                            {aadharFrontImage ? (
                                <Image source={{ uri: aadharFrontImage }} style={styles.image} />
                            ) : (
                                <View style={styles.placeholder}><Text>No Front Image</Text></View>
                            )}
                            {aadharBackImage ? (
                                <Image source={{ uri: aadharBackImage }} style={styles.image} />
                            ) : (
                                <View style={styles.placeholder}><Text>No Back Image</Text></View>
                            )}
                        </View>
                    )}

                    <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('pan')}>
                        <Text style={styles.dropdownText}>PAN Card</Text>
                        <Ionicons name={openDropdown === 'pan' ? "chevron-up" : "chevron-down"} size={20} color="white" />
                    </TouchableOpacity>
                    {openDropdown === 'pan' && (
                        <View style={styles.documentContainer}>
                            {renderLabel('PAN Number:', user?.pancard || 'Not provided')}
                            {panFrontImage ? (
                                <Image source={{ uri: panFrontImage }} style={styles.image} />
                            ) : (
                                <View style={styles.placeholder}><Text>No Front Image</Text></View>
                            )}
                        </View>
                    )}
                </>
            )}
            <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
            <View style={styles.bottom}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 30,
        backgroundColor: '#f8f9fa',
    },
    backButton: {
        position: 'absolute',
        marginTop: 10,
        left: 10,
        zIndex: 10,
        borderWidth: 2,
        padding: 5,
        borderColor: '#0F4A97',
        borderRadius: 5,
        backgroundColor: '#fff'
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
    labelTitle: {
        fontWeight: 'bold',
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
    deleteButton:{
        backgroundColor: '#ffe3e3',
        padding:15,
        borderColor:'red',
        borderWidth:2,
        borderRadius:8,
    },
    deleteButtonText:{
        color:'red',
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center'
    },
    bottom: {
        paddingBottom: 40,
    },
});

export default PersonalDetails;
