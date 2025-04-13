import {SET_DRIVERS,
  SET_CUSTOMERS,
  SET_USER_TYPE,
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
const SET_PAN_VERIFIED = "SET_PAN_VERIFIED"; 

const initialState = {
  profileImage: null,
  aadharFrontImage: null, 
  aadharBackImage: null, 
  panFrontImage: null,   
  panBackImage: null,  
    
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
  panVerified: false,
  
  userType: null,
  loan: {
    isTaken: false,
    amount: 0,
    term: 0,
    repaymentDate: null
  },
  loanType: 0
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

      case SET_USER_TYPE:
  return {
    ...state,
    userType: action.payload,
  };


    case SET_DRIVERS:
      console.log("Setting driver details in reducer:", action.payload);
      return {
        ...state,
        drivers: action.payload
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

    case 'SET_LOAN_TAKEN':
      return {
        ...state,
        loan: {
          isTaken: action.payload.isTaken,
          amount: action.payload.amount,
          term: action.payload.term,
          repaymentDate: action.payload.repaymentDate
        }
      };
    case 'SET_LOAN_TYPE':
      return {
        ...state,
        loanType: action.payload
      };
    case 'RESET_LOAN_TYPE':
      return {
        ...state,
        loanType: 0
      };
    case 'UPDATE_ACTIVE_AMOUNT':
      return {
        ...state,
        loan: {
          ...state.loan,
          amount: state.loan.amount - action.payload.amount,
          withdrawnAmount: (state.loan.withdrawnAmount || 0) + action.payload.withdrawnAmount,
          repaymentDate: action.payload.repaymentDate || state.loan.repaymentDate
        }
      };
      

    default:
      return state;
  }
};

export default rootReducer;