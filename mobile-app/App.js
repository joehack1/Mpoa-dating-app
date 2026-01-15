import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import PaymentScreen from './screens/PaymentScreen';
import BrowseScreen from './screens/BrowseScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Make Payment' }} />
          <Stack.Screen name="Browse" component={BrowseScreen} options={{ title: 'Browse Profiles' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}