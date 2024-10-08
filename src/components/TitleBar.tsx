// src/components/TitleBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TitleBarProps {
  title: string;
  onMenuPress: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ title, onMenuPress }) => {
  return (
    <View style={styles.titleBar}>
      <TouchableOpacity style={styles.navButton} onPress={onMenuPress}>
        <Text style={styles.navButtonText}>☰</Text>
      </TouchableOpacity>
      {/* Screen title */}
      {/* <Text style={styles.title}>{title}</Text> */}
      <Text style={styles.title}>Abdullah Traders</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    backgroundColor: '#6200ea',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
});

export default TitleBar;
