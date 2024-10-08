// src/screens/CustomerScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenNavigationProp } from '../components/types'; // Import shared types

interface ExpensesScreenProps {
  navigation: ScreenNavigationProp<'Staff'>;
}

const ExpensesScreen: React.FC<ExpensesScreenProps> = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Customer Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default ExpensesScreen;
