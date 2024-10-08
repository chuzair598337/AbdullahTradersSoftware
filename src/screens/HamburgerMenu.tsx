import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScreenNavigationProp } from '../components/types'; // Assuming you're using the shared types

interface HamburgerMenuProps {
    navigation: ScreenNavigationProp<any>; // Navigation prop to allow screen navigation
    isVisible: boolean;                   // To show/hide the menu
    onClose: () => void;                  // Close the menu function
}

class HamburgerMenu extends React.Component<HamburgerMenuProps> {
    render() {
        const { navigation, isVisible, onClose } = this.props;

        if (!isVisible) {
            // Do not render the menu if not visible
            return null;
        }

        return (
            <View style={styles.menuContainer}>

                {/* X button to close */}
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>

                {/* Logo */}
                <View style={styles.header}>
                    <Image source={require('../assets/logo/AT_Logo.png')} style={styles.logo} />
                    <Text style={styles.title}>Abdullah Traders</Text>
                </View>

                {/* Menu Buttons */}
                <View style={styles.menuItems}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => { navigation.navigate('Staff'); onClose(); }}>
                        <Text style={styles.buttonText}>Staff</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => { navigation.navigate('Customers'); onClose(); }}>
                        <Text style={styles.buttonText}>Customers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => { navigation.navigate('Orders'); onClose(); }}>
                        <Text style={styles.buttonText}>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => { navigation.navigate('Products'); onClose(); }}>
                        <Text style={styles.buttonText}>Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => { navigation.navigate('Suppliers'); onClose(); }}>
                        <Text style={styles.buttonText}>Suppliers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => { navigation.navigate('Expenses'); onClose(); }}>
                        <Text style={styles.buttonText}>Expenses</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.version}>Version 1.0</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 1000,
        padding: 20,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',

    },
    menuItems: {
        marginTop: 20,
    },
    menuButton: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 10, // Padding on top and bottom
        justifyContent: 'center', // Align content vertically
        alignItems: 'center', // Align content horizontally
    },
    version: {
        fontSize: 12, // Small font size for version text
        color: '#333', // Darker text color for contrast
    },
});

export default HamburgerMenu;
