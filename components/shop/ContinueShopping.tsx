import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import CustomerBasket from './CustomerBasket';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from 'types';
import { StackActions } from '@react-navigation/native';


type ContinueShoppingProps = {
  navigation: NavigationProp<StackParamList>;
}


const ContinueShopping: React.FC<ContinueShoppingProps> = ({ navigation }) => {


  const handleContinueShopping = () => {
    navigation.dispatch(StackActions.push('BrandVarieties', { screen: 'BrandVarieties'})); // Navigate to the BrandVarieties page
  };

  const handleCheckout = () => {
    navigation.dispatch(StackActions.push('LoginScreen', { screen: 'LoginScreen'})); // Navigate to the LoginScreen for checkout
  };

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <View style={styles.header}>
        <Text style={styles.smallText}>The item was added to your cart! Continue shopping or checkout now?</Text>
      </View>
      <CustomerBasket navigation={navigator} />
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={handleContinueShopping}>
          <Text style={styles.cardText}>Continue Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleCheckout}>
          <Text style={styles.cardText}>Checkout</Text>
        </TouchableOpacity>
      </View>
      <ShopFooter navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FB5B5A',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: 20,
  },
  card: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    color: '#1F1F1F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContinueShopping;