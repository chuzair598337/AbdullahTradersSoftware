import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenNavigationProp } from '../components/types'; // Import shared types

interface OrderScreenProps {
  navigation: ScreenNavigationProp<'Staff'>;
}

const OrderScreen: React.FC<OrderScreenProps> = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Order Screen</Text>
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

export default OrderScreen;
