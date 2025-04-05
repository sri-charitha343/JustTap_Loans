import React from 'react';
import { Provider } from 'react-redux';
import rootReducer from './app/store_management/reducers/reducers';
import store from './app/store_management/store';
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
import TakeSelfie from './app/Screens/RegistrationProcessScreens/TakeSelfie';
import ProfileImageScreen from './app/Screens/RegistrationProcessScreens/ProfileImageScreen';
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
import BasicProfileDetailsCustomer from './app/Screens/RegistrationProcessScreens/BasicProfileDetailsCustomer';
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EnterMobileNumber" component={EnterMobileNumber} options={{ headerShown: false }} />
          <Stack.Screen name="MobileOTPScreen" component={MobileOTPScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EnterDriverId" component={EnterDriverId} options={{ headerShown: false }} />
          <Stack.Screen name="SelectACatogory" component={SelectACatogory} options={{ headerShown: false }} />
          <Stack.Screen name="DriverLoan" component={DriverLoan} options={{ headerShown: false }} />
          <Stack.Screen name="DiffLoans" component={DiffLoans} options={{ headerShown: false }} />
          <Stack.Screen name="BasicProfileDetailsDriver" component={BasicProfileDetailsDriver} options={{ headerShown: false }} />
          <Stack.Screen name="BasicProfileDetailsCustomer" component={BasicProfileDetailsCustomer} options={{ headerShown: false }} />
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
          <Stack.Screen name="Cards" component={Cards} options={{ headerShown: false }} />
          <Stack.Screen name="InviteFriends" component={InviteFriends}  />
          <Stack.Screen name="HelpPage" component={HelpPage} options={{ headerShown: false }}  />


          <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
          <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{ headerShown: false }} />
          <Stack.Screen name="Security" component={Security} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
