import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type PurchaseInfoProps = {
  quantity: number;
  subtotal: number;
};


const PurchaseInfo: React.FC<PurchaseInfoProps> = ({ quantity, subtotal }) => {
    const increaseQuantity = () => {
      // implement quantity increase logic
    };
  
    const decreaseQuantity = () => {
      // implement quantity decrease logic
    };
  
    return (
        <View style={styles.container}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
            <Text style={styles.plusMinus}>+</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>Quantity: {quantity}</Text>
          <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
            <Text style={styles.plusMinus}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignText: 'center',
    justifyContent: 'center',
  },
  plusMinus: {
    fontSize: 24,
    color: '#FFFFFF', // the color should match your "Proceed to Checkout" button
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  subtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    alignItems: 'center',
  },
});

export default PurchaseInfo;