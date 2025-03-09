import {SET_DRIVERS,
  SET_CUSTOMERS,
  SET_USER_DATA,
  SET_AADHAR_NUMBER,
  STORE_PROFILE_IMAGE,
  STORE_PAN_NUMBER,
  STORE_AADHAR_FRONT_IMAGE,
  STORE_AADHAR_BACK_IMAGE,
  STORE_PAN_FRONT_IMAGE,
  STORE_PAN_BACK_IMAGE
} from "../actions/actions";

const SET_AADHAR_VERIFIED = "SET_AADHAR_VERIFIED";
const SET_PAN_VERIFIED = "SET_PAN_VERIFIED";  // Define the action type

const initialState = {
  user: {
    userType: null, // Initialize userType
  },

  profileImage: null,
  aadharFrontImage: null, // New state for front Aadhar image
  aadharBackImage: null,  // New state for back Aadhar image
  panFrontImage: null,    // New state for front Pan image
  panBackImage: null,     // New state for back Pan image
  drivers: {
    existsInBoth: false,
    data: null,
  },
  customers: {
    existsInBoth: false,
    data: null,
  },
  panNumber: null,
  aadharNumber: null,
  userData: null,
  aadharVerified: false,
  panVerified: false, // Added missing initial state
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AADHAR_VERIFIED:
      return {
        ...state,
        aadharVerified: action.payload, // Update verification status
      };
    case SET_PAN_VERIFIED: // Corrected to update panVerified
        return {
            ...state,
            panVerified: action.payload, // Update verification status

        };

    case STORE_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.payload,
      };

    case STORE_AADHAR_FRONT_IMAGE:
      return {
        ...state,
        aadharFrontImage: action.payload,
      };

    case STORE_AADHAR_BACK_IMAGE:
      return {
        ...state,
        aadharBackImage: action.payload,
      };

    case STORE_PAN_FRONT_IMAGE:
      return {
        ...state,
        panFrontImage: action.payload,
      };

    case STORE_PAN_BACK_IMAGE:
      return {
        ...state,
        panBackImage: action.payload,
      };

    case SET_AADHAR_NUMBER:
      return {
        ...state,
        aadharNumber: action.payload,
      };

    case STORE_PAN_NUMBER:
      return {
        ...state,
        panNumber: action.payload,
      };

    case SET_DRIVERS:
      console.log("Setting driver details in reducer:", action.payload); // Log for debugging
      return {
        ...state,
        drivers: {
          existsInBoth: action.payload.existsInBoth,
          data: action.payload,
        },
      };

    case SET_CUSTOMERS:
      return {
        ...state,
        customers: {
          existsInBoth: action.payload.existsInBoth,
          data: action.payload,
        },
      };

    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;