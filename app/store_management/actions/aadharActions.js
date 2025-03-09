export const STORE_AADHAR_FRONT_IMAGE = 'STORE_AADHAR_FRONT_IMAGE';
export const STORE_AADHAR_BACK_IMAGE = 'STORE_AADHAR_BACK_IMAGE';
export const SET_AADHAR_VERIFIED = 'SET_AADHAR_VERIFIED'; // New action type

export const storeAadharFrontImage = (image) => ({
    type: STORE_AADHAR_FRONT_IMAGE,
    payload: image,
});

export const storeAadharBackImage = (image) => ({
    type: STORE_AADHAR_BACK_IMAGE,
    payload: image,
});

export const setAadharVerified = (isVerified) => ({ // New action creator
    type: SET_AADHAR_VERIFIED,
    payload: isVerified,
});
