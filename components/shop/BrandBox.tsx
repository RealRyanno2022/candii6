import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import images from '../data/images';
import BrandData from '../data/BrandData';

type Product = {
  id: string;
  name: string; 
  price: number;
  brand: string;
  image: string;
};

type BrandBoxProps = {
  product: Product;
  selected: boolean;
  quantity: number;
  onSelect: () => void;
  onDeselect: () => void;
  navigation: any;
};

const BrandBox: React.FC<BrandBoxProps> = ({
  product,
  selected = false,
  quantity,
  onSelect,
  onDeselect,
  navigation,
}) => {
  const handleProductPress = () => {
    navigation.navigate('DisposableProductPage', { product });
  };

  return (
    <TouchableOpacity style={styles.brandBox} onPress={handleProductPress}>
      <Image style={styles.productImage} source={{ uri: product.image }} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{`${product.price?.toFixed(2)}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  brandBox: {
    backgroundColor: 'white', // make the background white
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
});

export default BrandBox;