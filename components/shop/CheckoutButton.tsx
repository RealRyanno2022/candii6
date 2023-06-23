import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutButton: React.FC = () => {
    const [basket, setBasket] = useState<any[]>([]);

  // Load basket items from AsyncStorage when component mounts
//   useEffect(() => {
//     const loadBasket = async () => {
//       try {
//         const storedBasket = await AsyncStorage.getItem('basket');
//         if (storedBasket !== null) {
//           setBasket(JSON.parse(storedBasket));
//         }
//       } catch (error) {
//         // Handle error if necessary
//       }
//     };

//     loadBasket();
//   }, []);

  const addBasketItem = async (item) => {
    try {
      let updatedBasket = [...basket, item];
      await AsyncStorage.setItem('basket', JSON.stringify(updatedBasket));
      setBasket(updatedBasket);
    } catch (error) {
      // Handle error if necessary
    }
  };

  const handlePress = () => {
    console.log('Honk!')    
  }

  return basket.length > 0 ? (
    <View style={styles.checkoutContainer}>
      <Button title="Proceed to Checkout" color="#3498db" onPress={handlePress} />
    </View>
  ) : (
    <View style={styles.emptyBasket}>
      <Text>Your basket is empty.</Text>
      <Text>Start Shopping!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
  },
  emptyBasket: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckoutButton;