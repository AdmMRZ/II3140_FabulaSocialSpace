// Entry point for Expo app
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import PaymentScreen from './screens/PaymentScreen';
import TenantRequestScreen from './screens/TenantRequestScreen';
import { CartProvider } from './contexts/CartContext';
import { DropProvider } from './contexts/DropContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <DropProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="TenantRequest" component={TenantRequestScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DropProvider>
    </CartProvider>
  );
}
