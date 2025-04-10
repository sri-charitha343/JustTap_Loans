export const SET_DRIVERS = "SET_DRIVERS";
export const SET_CUSTOMERS = "SET_CUSTOMERS";
export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_USER_DATA = "SET_USER_DATA";
export const SET_AADHAR_NUMBER = "SET_AADHAR_NUMBER";
export const STORE_PROFILE_IMAGE = "STORE_PROFILE_IMAGE";
export const STORE_PAN_NUMBER = "STORE_PAN_NUMBER";
export const STORE_AADHAR_FRONT_IMAGE = "STORE_AADHAR_FRONT_IMAGE";
export const STORE_AADHAR_BACK_IMAGE = "STORE_AADHAR_BACK_IMAGE";
export const STORE_PAN_FRONT_IMAGE = "STORE_PAN_FRONT_IMAGE";
export const STORE_PAN_BACK_IMAGE = "STORE_PAN_BACK_IMAGE";
export const SET_AADHAR_VERIFIED = "SET_AADHAR_VERIFIED";
export const SET_PAN_VERIFIED = "SET_PAN_VERIFIED";

export const setDrivers = (driverData) => ({
  type: SET_DRIVERS,
  payload: {
    existsInBoth: driverData.existsInBoth,
    data: driverData.data // Use the inner data directly
  }
});

export const setCustomers = (data) => ({
  type: SET_CUSTOMERS,
  payload: data
});

export const setUserType = (data) => ({
  type: SET_USER_TYPE,
  payload: data
});

export const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: data
});

export const setAadharNumber = (data) => ({
  type: SET_AADHAR_NUMBER,
  payload: data
});

export const storeProfileImage = (data) => ({
  type: STORE_PROFILE_IMAGE,
  payload: data
});

export const storePanNumber = (data) => ({
  type: STORE_PAN_NUMBER,
  payload: data
});

export const storeAadharFrontImage = (data) => ({
  type: STORE_AADHAR_FRONT_IMAGE,
  payload: data
});

export const storeAadharBackImage = (data) => ({
  type: STORE_AADHAR_BACK_IMAGE,
  payload: data
});

export const storePanFrontImage = (data) => ({
  type: STORE_PAN_FRONT_IMAGE,
  payload: data
});

export const storePanBackImage = (data) => ({
  type: STORE_PAN_BACK_IMAGE,
  payload: data
});

export const setAadharVerified = (data) => ({
  type: SET_AADHAR_VERIFIED,
  payload: data
});

export const setPanVerified = (data) => ({
  type: SET_PAN_VERIFIED,
  payload: data
});
