import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Staff: undefined;
  Customers: undefined;
  Orders: undefined;
  Products: undefined;
  Suppliers: undefined;
  Expenses: undefined;
  HamburgerMenuProps: undefined;

};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;



export interface Product {
  product_id: number;
  product_nameEnglish: string;
  product_nameUrdu: string;
  product_description?: string; // Optional field
  pcategory_id?: number;  // Optional field
}

export interface Category {
  category_id: number;
  category_nameEnglish: string;
  category_nameUrdu: string;
}

export interface ProductWithCategory {
  product_id: number;
  product_nameEnglish: string;
  product_nameUrdu: string;
  product_description?: string; // Optional field
  category_id: number; // Optional because it could be null if there is no category
  category_nameEnglish?: string; // Optional because it could be null if there is no category
  category_nameUrdu?: string; // Optional because it could be null if there is no category
}

