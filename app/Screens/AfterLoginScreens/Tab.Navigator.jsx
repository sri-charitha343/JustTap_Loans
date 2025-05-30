import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons,MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "./tabs/HomePage";
import ExploreScreen from "./tabs/ExploreScreen";
import LoansPage from "./tabs/LoansPage";
import ActivityPage from "./tabs/ActivityPage";
import ScannerPage from "./tabs/ScannerPage";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const loan = useSelector((state) => state.loan);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === "Explore") {
            return <Ionicons name="search" size={size} color={color} />;
          } else if (route.name === "Scanner") {
            return <Ionicons name="scan" size={size} color={color} />;
          } else if (route.name === "Draw") {
            return <MaterialIcons name="currency-rupee" size={size} color={color} />;
          } else if (route.name === "Activity") {
            return <Ionicons name="list" size={size} color={color} />;
          }
        
        },
        tabBarActiveTintColor: "skyblue",  // Active tab color
        tabBarInactiveTintColor: "white", // Inactive tab color
        tabBarStyle: styles.tabBar,  // Custom styles for tab bar
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
      {loan.isTaken && (
        <Tab.Screen name="Scanner" component={ScannerPage} options={{ headerShown: false }} />
      )}
      <Tab.Screen name="Draw" component={LoansPage} options={{ headerShown: false }} />
      <Tab.Screen name="Activity" component={ActivityPage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0F4A97",  // Tab bar background color
    height: 60,  // Tab bar height
    padding: 20,  // Padding for the tab bar
    marginBottom: 0.1,  // Bottom margin for tab bar
  },
});
