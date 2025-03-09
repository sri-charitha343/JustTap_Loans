SET_DRIVERS = 'SET_DRIVERS';
export const SET_CUSTOMERS = 'SET_CUSTOMERS';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_AADHAR_NUMBER ='SET_AADHAR_NUMBER';
export const STORE_PROFILE_IMAGE = 'STORE_PROFILE_IMAGE'; 
export const STORE_PAN_NUMBER = 'STORE_PAN_NUMBER';

export const storePanNumber = (panNumber) => ({
    type: STORE_PAN_NUMBER,
    payload: panNumber,
});


export const setDrivers = (captainData, existsInBoth) => ({
  type: SET_DRIVERS,
  payload: {
    ...captainData,
    existsInBoth, // Include existsInBoth in the payload
  },
});

export const setCustomers = (customerData) => ({
  type: SET_CUSTOMERS,
  payload: customerData,
});

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const storeProfileImage = (image) => { // New action creator
    return {
        type: STORE_PROFILE_IMAGE,
        payload: image,
    };
};

export const setAadharNumber = (aadharNumber) => {

    return {
        type: SET_AADHAR_NUMBER,
        payload: aadharNumber,
    };
};