import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the picker package
import APIWrapper from '../apiWrapper'; // Assuming this handles your API calls
import { ProductWithCategory, Category } from '../types';

interface ProductModalProps {
  isVisible: boolean;
  isEditMode: boolean;
  product: ProductWithCategory | null;
  onClose: () => void;
  onSave: (productData: ProductWithCategory) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isVisible, isEditMode, product, onClose, onSave }) => {
  const [nameEnglish, setNameEnglish] = useState('');
  const [nameUrdu, setNameUrdu] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  const api = useMemo(() => new APIWrapper(), []);

  useEffect(() => {
    // Only fetch categories when modal is visible
    if (isVisible) {
      const fetchCategories = async () => {
        try {
          const rows = await api.readAll('Category'); // Fetch categories from the database
          setCategories(rows);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      fetchCategories();
    }

    // Pre-fill fields if editing a product
    if (isEditMode && product) {
      setNameEnglish(product.product_nameEnglish);
      setNameUrdu(product.product_nameUrdu);
      setDescription(product.product_description || '');
      setCategoryId(product.category_id?.toString() || '');
    } else {
      // Reset fields when adding a new product
      setNameEnglish('');
      setNameUrdu('');
      setDescription('');
      setCategoryId('');
    }
  }, [isVisible, api, isEditMode, product]);

  const handleSave = () => {
    const productData = {
      product_id: product?.product_id || 0,
      product_nameEnglish: nameEnglish,
      product_nameUrdu: nameUrdu,
      product_description: description,
      category_id: parseInt(categoryId, 10),
      category_nameEnglish: '',
      category_nameUrdu: '',
    };
    onSave(productData);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{isEditMode ? 'Edit Product' : 'Add Product'}</Text>
          <View style={styles.formGroup}>
            <TextInput
              placeholder="Product Name (English)"
              value={nameEnglish}
              onChangeText={setNameEnglish}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Product Name (Urdu)"
              value={nameUrdu}
              onChangeText={setNameUrdu}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.textInput}
            />

            {/* Dropdown for selecting category */}
            <Picker
              selectedValue={categoryId}
              onValueChange={(itemValue) => {
                if (itemValue) {
                  setCategoryId(itemValue); // Ensure that the selected value is being set correctly
                }
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" />
              {categories.map((category) => (
                <Picker.Item
                  key={category.category_id}
                  label={`${category.category_nameEnglish} - ${category.category_nameUrdu}`}
                  value={category.category_id.toString()}
                />
              ))}
            </Picker>

          </View>
          <View style={styles.footer}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductModal;
