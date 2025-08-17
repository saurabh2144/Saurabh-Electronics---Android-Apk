import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomePage from './screens/HomePage';
import CartPage from './screens/CartPage';
import OpenItem from './screens/OpenItem';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
         <Stack.Screen name="HomePage" component={HomePage} />
         <Stack.Screen name="CartPage" component={CartPage} />
         <Stack.Screen name="OpenItem" component={OpenItem} />
    
         
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
