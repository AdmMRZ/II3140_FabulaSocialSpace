// Entry point for Expo app
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';

// Ignore specific warnings in production
LogBox.ignoreLogs(['Remote debugger']);
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import PaymentScreen from './screens/PaymentScreen';
import TenantRequestScreen from './screens/TenantRequestScreen';
import Splash from './components/Splash';
import { CartProvider } from './contexts/CartContext';
import AuthProvider from './contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Menu" component={MenuScreen} />
              <Stack.Screen name="Checkout" component={CheckoutScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen name="TenantRequest" component={TenantRequestScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
