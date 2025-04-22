import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store_management/store';
import { NavigationContainer } from '@react-navigation/native';
import CompleteCustomerProfile from './app/Screens/RegistrationProcessScreens/CustomerRegistration/CompleteCustomerProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './app/Screens/SplashScreens/SplashScreen';
import WelcomeScreen from './app/Screens/LoginScreens/WelcomeScreen';
import EnterMobileNumber from './app/Screens/LoginScreens/EnterMobileNumber';
import MobileOTPScreen from './app/Screens/LoginScreens/MobileOTPScreen';
import EnterDriverId from './app/Screens/Driver/EnterDriverId';
import SelectACatogory from './app/Screens/Driver/SelectACatogory';
import DriverLoan from './app/Screens/Driver/DriverLoan';
import DiffLoans from './app/Screens/Customer/DiffLoans';
import TakeSelfie from './app/Screens/RegistrationProcessScreens/CustomerRegistration/TakeSelfie';
import ProfileImageScreen from './app/Screens/RegistrationProcessScreens/CustomerRegistration/ProfileImageScreen';
import AadharUpload from './app/Screens/RegistrationProcessScreens/CustomerRegistration/AadharUpload';
import AadharFrontandBack from './app/Screens/RegistrationProcessScreens/CustomerRegistration/AadharFrontandBack';
import PanFrontandBack from './app/Screens/RegistrationProcessScreens/CustomerRegistration/PanFrontandBack';
import AadharImageUpload from './app/Screens/RegistrationProcessScreens/CustomerRegistration/AadharImageUpload';
import AadharUploadFromFile from './app/Screens/RegistrationProcessScreens/CustomerRegistration/AadharUploadFromFile';
import PanCard from './app/Screens/RegistrationProcessScreens/CustomerRegistration/PanCard';
import PanCardUpload from './app/Screens/RegistrationProcessScreens/CustomerRegistration/PanCardUpload';
import PanCardUploadFromFile from './app/Screens/RegistrationProcessScreens/CustomerRegistration/PanCardUploadFromFile';
import Processing from './app/Screens/RegistrationProcessScreens/Processing';

import TabNavigator from './app/Screens/AfterLoginScreens/Tab.Navigator';  // Ensure correct path
import BasicProfileDetailsDriver from './app/Screens/RegistrationProcessScreens/DriverRegistration/BasicProfileDetailsDriver';
import BasicProfileDetailsCustomer from './app/Screens/RegistrationProcessScreens/CustomerRegistration/BasicProfileDetailsCustomer';
import AadharOpt from './app/Screens/RegistrationProcessScreens/DriverRegistration/AadharOpt';
import PanOpt from './app/Screens/RegistrationProcessScreens/DriverRegistration/PanOpt';
import TakeSelfieDriver from './app/Screens/RegistrationProcessScreens/DriverRegistration/TakeSelfieDriver';
import DriverProfilePicture from './app/Screens/RegistrationProcessScreens/DriverRegistration/DriverProfilePicture';
import CompletedDriverProfile from './app/Screens/RegistrationProcessScreens/DriverRegistration/CompleteDriverProfile';
import PersonalDetails from './app/Screens/AfterLoginScreens/ProfileScreens/PersonalDetails';
import Security from './app/Screens/AfterLoginScreens/ProfileScreens/Security';
import ProfilePage from './app/Screens/AfterLoginScreens/ProfileScreens/ProfilePage';
import OverView from './app/Screens/AfterLoginScreens/HomePageScreens/OverView';
import Cards from './app/Screens/AfterLoginScreens/HomePageScreens/Cards';
import InviteFriends from './app/Screens/AfterLoginScreens/HomePageScreens/InviteFriends';
import HelpPage from './app/Screens/AfterLoginScreens/HomePageScreens/HelpPage';
import AllTransactions from './app/Screens/AfterLoginScreens/HomePageScreens/OverViewPages/AllTransactions';
import TakeOrPayPage from './app/Screens/AfterLoginScreens/HomePageScreens/TakeOrPayPage';
import TakenAmountSummary from './app/Screens/AfterLoginScreens/HomePageScreens/TakeProcessPages/TakenAmountSummary';
import EmiPlanPage from './app/Screens/AfterLoginScreens/HomePageScreens/TakeProcessPages/EmiPlanPage';
import PaymentPage from './app/Screens/AfterLoginScreens/HomePageScreens/TakeProcessPages/PaymentPage';
import ChooseAPlan from './app/Screens/AfterLoginScreens/HomePageScreens/ChooseAPlan';
import UserDetailsPage from './app/Screens/AfterLoginScreens/LoansPageSteps/UserDetailsPage';
import CameraCapturePage from './app/Screens/AfterLoginScreens/LoansPageSteps/CameraCapturePage';
import BankDetailsPage from './app/Screens/AfterLoginScreens/LoansPageSteps/BankDetailsPage';
import LoanProcessingScreen from './app/Screens/AfterLoginScreens/LoansPageSteps/LoanProcessingScreen';
import AfterProcessingPage from './app/Screens/AfterLoginScreens/LoansPageSteps/AfterProcessingPage';
import CategoriesPage from './app/Screens/RegistrationProcessScreens/CustomerRegistration/CategoriesPage';
import TransactionDetails from './app/Screens/AfterLoginScreens/ActivityPages/TransactionDetails';
import StudentId from './app/Screens/RegistrationProcessScreens/CustomerRegistration/StudentId';
import StudentIdUpload from './app/Screens/RegistrationProcessScreens/CustomerRegistration/StudentIdUpload';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EnterMobileNumber" component={EnterMobileNumber} options={{ headerShown: false }} />
          <Stack.Screen name="MobileOTPScreen" component={MobileOTPScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CategoriesPage" component={CategoriesPage} options={{ headerShown: false }} />
          <Stack.Screen name="EnterDriverId" component={EnterDriverId} options={{ headerShown: false }} />
          <Stack.Screen name="SelectACatogory" component={SelectACatogory} options={{ headerShown: false }} />
          <Stack.Screen name="DriverLoan" component={DriverLoan} options={{ headerShown: false }} />
          <Stack.Screen name="DiffLoans" component={DiffLoans} options={{ headerShown: false }} />
          <Stack.Screen name="BasicProfileDetailsDriver" component={BasicProfileDetailsDriver} options={{ headerShown: false }} />
          <Stack.Screen name="BasicProfileDetailsCustomer" component={BasicProfileDetailsCustomer} options={{ headerShown: false }} />
          <Stack.Screen name="StudentId" component={StudentId} options={{ headerShown: false }} />
          <Stack.Screen name="StudentIdUpload" component={StudentIdUpload} options={{ headerShown: false }} />
          <Stack.Screen name="AadharOpt" component={AadharOpt} options={{ headerShown: false }} />
          <Stack.Screen name="PanOpt" component={PanOpt} options={{ headerShown: false }} />
          <Stack.Screen name="TakeSelfieDriver" component={TakeSelfieDriver} options={{ headerShown: false }} />
          <Stack.Screen name="DriverProfilePicture" component={DriverProfilePicture} options={{ headerShown: false }} />
          <Stack.Screen name="CompletedDriverProfile" component={CompletedDriverProfile} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileImageScreen" component={ProfileImageScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AadharUpload" component={AadharUpload} options={{ headerShown: false }} />
          <Stack.Screen name="PanCard" component={PanCard} options={{ headerShown: false }} />
          <Stack.Screen name="TakeSelfie" component={TakeSelfie} options={{ headerShown: false }} />
          <Stack.Screen name="AadharFrontandBack" component={AadharFrontandBack} options={{ headerShown: false }} />
          <Stack.Screen name="AadharImageUpload" component={AadharImageUpload} options={{ headerShown: false }} />
          <Stack.Screen name="AadharUploadFromFile" component={AadharUploadFromFile} options={{ headerShown: false }} />
          <Stack.Screen name="PanFrontandBack" component={PanFrontandBack} options={{ headerShown: false }} />
          <Stack.Screen name="PanCardUpload" component={PanCardUpload} options={{ headerShown: false }} />
          <Stack.Screen name="PanCardUploadFromFile" component={PanCardUploadFromFile} options={{ headerShown: false }} />
          <Stack.Screen name="Processing" component={Processing} options={{ headerShown: false }} />
          <Stack.Screen name="CompleteCustomerProfile" component={CompleteCustomerProfile} options={{ headerShown: false }} />


          <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
          
          <Stack.Screen name="OverView" component={OverView} options={{ headerShown: false }} />
          <Stack.Screen name="AllTransactions" component={AllTransactions}  />
          <Stack.Screen name="Cards" component={Cards} options={{ headerShown: false }} />
          <Stack.Screen name="InviteFriends" component={InviteFriends}  />
          <Stack.Screen name="HelpPage" component={HelpPage} options={{ headerShown: false }}  />
          <Stack.Screen name="TakeOrPayPage" component={TakeOrPayPage} options={{ headerShown: false }} />
          <Stack.Screen name="TakenAmountSummary" component={TakenAmountSummary} options={{ headerShown: false }} />
          <Stack.Screen name="EmiPlanPage" component={EmiPlanPage} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentPage" component={PaymentPage} options={{ headerShown: false }} />
          <Stack.Screen name="ChooseAPlan" component={ChooseAPlan} options={{ headerShown: false }} />

          <Stack.Screen name="TransactionDetails" component={TransactionDetails} options={{ headerShown: false }} />

          <Stack.Screen name="UserDetailsPage" component={UserDetailsPage} options={{ headerShown: false }} />
          <Stack.Screen name="CameraCapturePage" component={CameraCapturePage} options={{ headerShown: false }} />
          <Stack.Screen name="BankDetailsPage" component={BankDetailsPage} options={{ headerShown: false }} />
          <Stack.Screen name="LoanProcessingScreen" component={LoanProcessingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AfterProcessingPage" component={AfterProcessingPage} options={{ headerShown: false }} />


          <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
          <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{ headerShown: false }} />
          <Stack.Screen name="Security" component={Security} options={{ headerShown: false }} />
        </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
