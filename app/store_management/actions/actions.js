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
export const SET_STD_ID_VERIFIED = "SET_STD_ID_VERIFIED";
export const STORE_STD_ID_NUMBER = "STORE_STD_ID_NUMBER";
export const SET_LOAN_TAKEN = "SET_LOAN_TAKEN";
export const SET_LOAN_TYPE = "SET_LOAN_TYPE";
export const RESET_LOAN_TYPE = "RESET_LOAN_TYPE";

export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";



export const setSelectedCategory = (category, loanAmount) => ({
  type: SET_SELECTED_CATEGORY,
  payload: { category, loanAmount },
});

export const storeStdIDNumber = (data) => ({
  type: STORE_STD_ID_NUMBER,
  payload: data,
});

export const setStdIdVerified = (data) => ({
  type: SET_STD_ID_VERIFIED,
  payload: data,
});

export const setLoanType = (loanType) => ({
  type: SET_LOAN_TYPE,
  payload: loanType
});

export const resetLoanType = () => ({
  type: RESET_LOAN_TYPE
});

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

export const setLoanTaken = (status) => ({
  type: SET_LOAN_TAKEN,
  payload: status, // true or false
});

export const updateActiveAmount = (withdrawalData) => ({
  type: 'UPDATE_ACTIVE_AMOUNT',
  payload: {
    amount: withdrawalData.amount,
    withdrawnAmount: withdrawalData.withdrawnAmount,
    repaymentDate: withdrawalData.repaymentDate,
    emiThisMonth: withdrawalData.emiThisMonth
  }
});

// New action types for bank details
export const STORE_BANK_DETAILS = "STORE_BANK_DETAILS";

// Action creator for storing bank details
export const storeBankDetails = (bankDetails) => ({
  type: STORE_BANK_DETAILS,
  payload: bankDetails,
});
