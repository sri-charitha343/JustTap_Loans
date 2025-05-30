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
  STORE_PAN_BACK_IMAGE,
  STORE_BANK_DETAILS
} from "../actions/actions";

const SET_AADHAR_VERIFIED = "SET_AADHAR_VERIFIED";
const SET_PAN_VERIFIED = "SET_PAN_VERIFIED"; 
const SET_STD_ID_VERIFIED = "SET_STD_ID_VERIFIED";

const initialState = {
  loanAmount: 0,
  profileImage: null,
  aadharFrontImage: null, 
  aadharBackImage: null, 
  panFrontImage: null,   
  panBackImage: null,  
  stdIdVerified: false,
    
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

  // New bank details state
  bankDetails: {
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  },
  
  userType: null,
  loan: {
  selectedCategory: null,
    isTaken: false,
    amount: 0,
    term: 0,
    repaymentDate: null,
    withdrawnAmount: 0,
    totalWithdrawnAmount: 0,
    remainingAvailableAmount: 0,
    totalRepaymentAmount: 0,
    emiThisMonth: 0
  },
  loanType: 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AADHAR_VERIFIED:
      return {
        ...state,
        aadharVerified: action.payload,
      };

    case SET_PAN_VERIFIED:
        return {
            ...state,
            panVerified: action.payload,
        };
    case SET_STD_ID_VERIFIED:
      return {
        ...state,
        stdIdVerified: action.payload,
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

    case STORE_BANK_DETAILS:
      return {
        ...state,
        bankDetails: {
          bankName: action.payload.bankName,
          accountNumber: action.payload.accountNumber,
          ifscCode: action.payload.ifscCode
        }
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
      case 'SET_SELECTED_CATEGORY':
        return {
          ...state,
          loan: {
            ...state.loan,
            selectedCategory: action.payload.category,
            amount: action.payload.loanAmount
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
          withdrawnAmount: action.payload.withdrawnAmount,
          repaymentDate: action.payload.repaymentDate || state.loan.repaymentDate,
          totalWithdrawnAmount: action.payload.totalAmount || (action.payload.withdrawnAmount + 120 + 40),
          remainingAvailableAmount: state.loan.amount - action.payload.withdrawnAmount,
          emiThisMonth: action.payload.emiThisMonth || 0
        }
      };

    default:
      return state;
  }
};

export default rootReducer;
