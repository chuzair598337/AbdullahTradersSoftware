// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import TitleBar from '../components/TitleBar';
import { ScreenNavigationProp } from '../components/types'; // Import shared types

import HamburgerMenu from './HamburgerMenu';

interface HomeScreenProps {
    navigation: ScreenNavigationProp<'Staff'>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };


    return (
        <SafeAreaView style={styles.container}>
            {/* Title Bar with Hamburger Menu Button */}
            <TitleBar title="My App" onMenuPress={toggleMenu} />

            {/* Hamburger Menu */}
            <HamburgerMenu navigation={navigation} isVisible={menuVisible} onClose={toggleMenu} />

            {/* Main Content */}
            <View style={styles.content}>
                <TouchableOpacity style={styles.tableButton} onPress={() => navigation.navigate('Staff')}>
                    <Text style={styles.buttonText}>Staff</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tableButton} onPress={() => navigation.navigate('Customers')}>
                    <Text style={styles.buttonText}>Customers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tableButton} onPress={() => navigation.navigate('Orders')}>
                    <Text style={styles.buttonText}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tableButton} onPress={() => navigation.navigate('Products')}>
                    <Text style={styles.buttonText}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tableButton} onPress={() => navigation.navigate('Suppliers')}>
                    <Text style={styles.buttonText}>Suppliers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tableButton} onPress={() => navigation.navigate('Expenses')}>
                    <Text style={styles.buttonText}>Expenses</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 16,
    },
    tableButton: {
        backgroundColor: '#6200ea',
        padding: 20,
        marginVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
    },
});

export default HomeScreen;
