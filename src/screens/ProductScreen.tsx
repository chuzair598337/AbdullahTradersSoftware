import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList, Alert } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan, faSquarePlus, faPencil } from '@fortawesome/free-solid-svg-icons';

import { ScreenNavigationProp, ProductWithCategory } from '../components/types';
import APIWrapper from '../components/apiWrapper'; // Import the API wrapper
import ProductModal from '../components/Modal/ProductModal';


interface ProductScreenProps {
  navigation: ScreenNavigationProp<'Orders'>;
}

const ProductScreen: React.FC<ProductScreenProps> = () => {
  const [products, setProducts] = useState<ProductWithCategory[]>([]); // State for storing products
  const [selectedProduct, setSelectedProduct] = useState<ProductWithCategory | null>(null); // Track selected product
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const api = useMemo(() => new APIWrapper(), []); // APIWrapper is created only once


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await api.getAllProduct();
        if(result.status)
        {
          setProducts(result.result); // Set fetched products into state
        }

      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, [api]);

  const handleDelete = useCallback(async () => {
    if (!selectedProduct) { return; }
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product: ${selectedProduct.product_nameEnglish}?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const result = await api.deleteRecord('Product', selectedProduct.product_id);
              if (result.changes > 0) {
                setProducts((prevProducts) => prevProducts.filter(product => product.product_id !== selectedProduct.product_id));
                setSelectedProduct(null); // Reset selection after delete
              }
            } catch (err) {
              console.error('Error deleting product:', err);
            }
          },
        },
      ]
    );
  }, [api, selectedProduct]);

  const handleUpdate = () => {
    if (!selectedProduct) { return; }
    setEditMode(true);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setEditMode(false);
    setModalVisible(true);
  };

  const handleSave = async (productData: ProductWithCategory) => {
    try {
      if (isEditMode) {
        await api.updateProduct(productData);
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.product_id === productData.product_id ? productData : p))
        );
      } else {
        // Make a shallow copy and delete the product_id field
        const { product_id, ...dataWithoutId } = productData;
        console.log(product_id);
        const result = await api.addNewProduct(dataWithoutId);
        if (result.status) {
          setProducts((prevProducts) => [...prevProducts, { ...productData, product_id: result.result }]);
        }
      }
      setModalVisible(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleSelectProduct = (product: ProductWithCategory) => {
    setSelectedProduct(product); // Set the selected product
  };

  const cancelSelection = () => {
    setModalVisible(false);
    setSelectedProduct(null); // Clear the selected product
  };

  // Render each product row
  const renderProduct = ({ item }: { item: ProductWithCategory }) => (
    <TouchableOpacity
      onLongPress={() => handleSelectProduct(item)} // Handle long press for selection
      delayLongPress={500} // Optional: Adjust the delay time (default is 500ms)
    >
      <View style={[styles.tableRow, selectedProduct?.product_id === item.product_id ? styles.selectedRow : null]}>
        <Text style={[styles.tableCell, styles.idCell]}>{item.product_id}</Text>
        <View style={[styles.nameContainer]}>
          <Text style={styles.nameEnglishCell}>{item.product_nameEnglish}</Text>
          <Text style={styles.nameUrduCell}>{item.product_nameUrdu}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={cancelSelection}>
      <View style={styles.screenContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.screenTitle}>Products</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleUpdate}
              style={[styles.actionButton, selectedProduct ? styles.enabledButton : styles.disabledButton]}
              disabled={!selectedProduct}
            >
              <FontAwesomeIcon icon={faPencil} size={25} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={[styles.actionButton, selectedProduct ? styles.enabledButton : styles.disabledButton]}
              disabled={!selectedProduct}
            >
              <FontAwesomeIcon icon={faTrashCan} size={25} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAdd}
              style={[styles.actionButton]}
            >
              <FontAwesomeIcon icon={faSquarePlus} size={35} color="#87CEEB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Display products in a table format */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.idCell, styles.tableHeaderCell]}>ID</Text>
            <Text style={[styles.tableCell, styles.nameCell, styles.tableHeaderCell]}>Name</Text>
          </View>

          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.product_id.toString()}
          />
        </View>

        <ProductModal
          isVisible={isModalVisible}
          isEditMode={isEditMode}
          product={selectedProduct}
          onClose={cancelSelection}
          onSave={handleSave}
        />

      </View>
    </TouchableWithoutFeedback>
  );
};

// Styles for the screen and table
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    marginHorizontal: 10,

  },
  enabledButton: {
    display: 'flex',
  },
  disabledButton: {
    display: 'none',
  },
  tableContainer: {},
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 10,
  },
  tableHeaderCell: {
    color: 'white',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  selectedRow: {
    backgroundColor: '#90EE90',
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 16,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  idCell: {
    flex: 0.5,
  },
  nameCell: {
    flex: 2,
  },
  nameContainer: {
    flexDirection: 'column', // Aligns English and Urdu text horizontally
    flex: 2,
    justifyContent: 'space-between', // Puts space between English (left) and Urdu (right)
  },
  nameEnglishCell: {
    flex: 1,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  nameUrduCell: {
    flex: 1,
    textAlign: 'right',
    paddingHorizontal: 10,
  },

});

export default ProductScreen;
