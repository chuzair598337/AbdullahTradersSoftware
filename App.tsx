// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import StaffScreen from './src/screens/StaffScreen';
import CustomerScreen from './src/screens/CustomerScreen';
import OrderScreen from './src/screens/OrderScreen';
import ProductScreen from './src/screens/ProductScreen';
import SupplierScreen from './src/screens/SupplierScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';


// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Create a constant for the title
const TITLE = 'ABDULLAH TRADERS';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: TITLE, headerShown: false }} />
        <Stack.Screen name="Staff" component={StaffScreen} options={{ title: TITLE }} />
        <Stack.Screen name="Customers" component={CustomerScreen} options={{ title: TITLE }} />
        <Stack.Screen name="Orders" component={OrderScreen} options={{ title: TITLE }} />
        <Stack.Screen name="Products" component={ProductScreen} options={{ title: TITLE }} />
        <Stack.Screen name="Suppliers" component={SupplierScreen} options={{ title: TITLE }} />
        <Stack.Screen name="Expenses" component={ExpensesScreen} options={{ title: TITLE }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
