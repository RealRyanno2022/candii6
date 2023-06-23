import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProductWithQuantity = typeof product & { quantity: number };

type NonDisposableProductPageProps = {
  navigation: StackNavigationProp<StackParamList>;
  route: RouteProp<StackParamList, 'NonDisposableProductPage'>;
}

const NonDisposableProductPage: React.FC<NonDisposableProductPageProps> = ({ navigation, route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  let initialPrice = product.price;

  if(product.brand === 'DragX') {
    initialPrice += 9;
  }

  const [totalPrice, setTotalPrice] = useState(initialPrice);

  let brandText = `The ${product.brand} non-disposable e-cigarette is a refillable e-cigarette which comes with detachable pod and coil components (sold separately). To use the e-cigarette, open the juice tank and insert the e-liquid vial nozzle before dripping it in. Be careful not to overfill the tank!`;

  if (product.brand === 'DragX') {
    brandText += ' This DragX model requires a battery to function (Factored into the price). The DragX is our strongest non-disposable e-cigarette brand, perfect for long drags!';
  }

  // The rest of the component code remains the same

  const reloadData = () => {
    navigation.navigate('ShopFront');
  }

  const getProductPrice = () => {
    let pricePerItem = product.price;
    if (selectedNicotineStrength === 20) {
      pricePerItem += 5;
    }

    if (quantity === 3 && parseInt(selectedNicotineStrength) < 20) {
      return 12.5;
    } else {
      return quantity * pricePerItem;
    }
  };

  useEffect(() => {
    let newTotalPrice = product.price;
    if (quantity > 1) {
      newTotalPrice = (product.price + 0.01) * quantity;
    }
    setTotalPrice(newTotalPrice);
  }, [quantity]);

  const addToBasket = async () => {
    try {
      const productWithQuantity = {
        ...product,
        quantity: quantity,
      };

      const storedBasket = await AsyncStorage.getItem('basket');
      let basket = [];

      if (storedBasket !== null) {
        basket = JSON.parse(storedBasket);
      }

      basket.push(productWithQuantity);
      await AsyncStorage.setItem('basket', JSON.stringify(basket));

      navigation.dispatch(StackActions.push('CustomerBasket'));
    } catch (error) {
      console.error('Failed to add the item to the basket.', error);
    }
  };

  let basket: ProductWithQuantity[] = [];

  const incrementQuantity = () => {
    if(quantity < 12) {
      setQuantity(quantity + 1);
    }
  }

  const decrementQuantity = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.content}>
          {product ? (
            <>
              <View style={styles.productInfo2}>
                <Text style={styles.productInfoHeader}>{product.brand} - {product.name}</Text>
              </View>
              <View style={styles.productInfo}>
                {product.image && product.image.length > 0 ? (
                  <Image source={require('../pictures/logo.png')} style={styles.image} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.placeholderText}>Image Unavailable</Text>
                  </View>
                )}
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productInfoDescription}>{brandText}</Text>
              </View>
              <View style={styles.productInfo}>
                <View style={styles.priceQuantityContainer}>
                  <Text style={styles.productInfoHeader}>{`€ ${totalPrice.toFixed(2)}`}</Text>
                  <View style={styles.quantitySelector}>
                    <TouchableOpacity onPress={decrementQuantity}>
                      <Ionicons name="remove-circle-outline" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={incrementQuantity}>
                      <Ionicons name="add-circle-outline" size={30} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.buyButton, styles.buttonSpacing]} 
                onPress={addToBasket}
              >
                <Text style={styles.buyButtonText}>Add to Basket</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.buyButton, styles.buttonSpacing]} 
                onPress={() => navigation.dispatch(StackActions.push('DeliveryAddress', { product }))}
              >
                <Text style={styles.buyButtonText}>Buy Now</Text>
              </TouchableOpacity>
              <View style={styles.space}></View>
            </>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>You haven't loaded this product.</Text>
              <TouchableOpacity style={styles.button} onPress={reloadData}>
                <Text style={styles.buttonText}>Reload</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      <ShopFooter navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  button: {

  },
  title: {
  
  },
  buttonText: {

  },
  container: {
    backgroundColor: '#FCCC7C',
    padding: 10,
  },
  buttonSpacing: {
    marginVertical: 20,
  },
  imagePlaceholder: {
    height: 225,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholderText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'OpenSans-Regular',
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    height: 225,
    width: '100%',
    borderRadius: 10,
    padding: 20,
  },
  productInfo: {
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo2: {
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  productInfoHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
    alignItems: 'center',
  },
  productInfoDescription: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
  },
  space: {
    marginBottom: 50,
  },
  buyButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Bold',
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default NonDisposableProductPage;