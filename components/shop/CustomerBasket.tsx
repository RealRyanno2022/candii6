import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import BrandBox from './BrandBox';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PurchaseInfo from './PurchaseInfo';
import { LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type ProductImage = string;

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  type: 'juice' | 'disposable' | 'nonDisposable' | 'part';
  image: ProductImage;
};

type CustomerBasketProps = {
  navigation: StackNavigationProp<StackParamList, 'CustomerBasket'>;
  route: RouteProp<StackParamList, 'CustomerBasket'>;
};

type BasketItem = {
  product: Product;
  quantity: number;
}

const CustomerBasket: React.FC<CustomerBasketProps> = ({ navigation, route}) => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  const subtotal = basketItems.reduce((total, item) => {
    if (!item.product) {
      console.error('Item does not have a product property:', item);
      return total;
    }
    return total + item.product.price * item.quantity + (item.quantity > 1 ? (item.quantity - 1) / 100 : 0);
  }, 0);

  const numItems = basketItems.reduce((total, item) => total + item.quantity, 0);


  
  
  LogBox.ignoreLogs(['Warning: ...']);

  const loadBasket = async () => {
    try {
      const storedBasket = await AsyncStorage.getItem('basket');
      if (storedBasket !== null) {
        const parsedBasket = JSON.parse(storedBasket);
        // If parsedBasket is not an array or contains any undefined elements, default to an empty array
        setBasketItems(Array.isArray(parsedBasket) ? parsedBasket.filter(item => item && item.product) : []);
        console.log('parsedBasket:', parsedBasket); // Moved console log here
      }
      console.log('storedBasket:', storedBasket); // This console log remains here
    } catch (error) {
      console.error('Failed to parse the basket.', error);
    }
  };
  

  useEffect(() => {
    loadBasket();
  }, []);

  // rest of your useEffects


  console.log('basketItems:', basketItems); // Added console log


  
  


  useEffect(() => {
    if (route.params?.item && route.params.item.id) {
      const foundIndex = basketItems.findIndex(item => item.product.id === route.params.item.id);
      if (foundIndex !== -1) {
        const newBasketItems = [...basketItems];
        newBasketItems[foundIndex].quantity += 1;
        setBasketItems(newBasketItems);
      } else {
        setBasketItems(oldBasket => [...oldBasket, { product: route.params.item, quantity: 1 }]);
      }
    }
  }, [route.params?.item]);

  const increaseQuantity = (index: number) => {
    const newBasketItems = [...basketItems];
    newBasketItems[index].quantity += 1;
    setBasketItems(newBasketItems);
  };

  const decreaseQuantity = (index: number) => {
    const newBasketItems = [...basketItems];
    newBasketItems[index].quantity -= 1;
    if (newBasketItems[index].quantity === 0) {
      newBasketItems.splice(index, 1);
    }
    setBasketItems(newBasketItems);
  };

  const renderBasketItem = ({ item, index }: { item: BasketItem, index: number }) => {
    if (!item.product) {
      console.error('Attempting to render basket item without product property:', item);
      return null; // don't render this item if product is not defined
    }
  
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <ShopHeader navigation={navigation} />
        <ScrollView style={styles.content} bounces={false}>
          <Text style={styles.title}>Your Basket</Text>
          {numItems > 0 ? (
            <View style={styles.basketContent}>
              <View style={styles.checkoutInfo}>
                <Text style={styles.subtotal}>Subtotal: €{subtotal.toFixed(2)}</Text>
                <TouchableOpacity style={styles.button} onPress={handleCheckoutPress}>
                  <Text style={styles.buttonText}>Proceed to Checkout ({numItems} items)</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                style= {{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                data={basketItems}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={renderBasketItem}
              />
            </View>
          ) : (
            <View style={styles.emptyBasketContainer}>
              <Text style={styles.emptyBasketText}>Your basket is empty</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShopFront')}>
                <Text style={styles.buttonText}>Start Shopping!</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <View style={styles.footerContainer}>
          <ShopFooter navigation={navigation} />
        </View>
      </View>
    );
  };

  const handleStartShopping = () => {
    navigation.navigate('ShopFront');
  };

  return (
    <View style={styles.container}>
                     <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
      
      <ShopHeader navigation={navigation} />
      <ScrollView style={styles.content} bounces={false} contentContainerStyle={{ paddingBottom: 60 }}>
        <Text style={styles.title}>Your Basket</Text>
        {numItems > 0 ? (
          <View style={styles.basketContent}>
            <View style={styles.checkoutInfo}>
              <Text style={styles.subtotal}>Subtotal: €{subtotal.toFixed(2)}</Text>
              <TouchableOpacity style={styles.button} onPress={handleCheckoutPress}>
                <Text style={styles.buttonText}>Proceed to Checkout ({numItems} items)</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style= {{ width: '100%' }}
              showsVerticalScrollIndicator={false}
              data={basketItems}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={renderBasketItem}
            />
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyBasketText}>Your basket is empty</Text>
            <TouchableOpacity style={styles.button} onPress={handleStartShopping}>
              <Text style={styles.buttonText}>Start Shopping!</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <View style={styles.footerContainer}>
        <ShopFooter navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'center',  // Added alignSelf
},

emptyBasketText: {
  color: 'black',
  fontSize: 18,
  marginBottom: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  paddingVertical: 10,
  padding: 20,
  borderRadius: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  elevation: 2,
  alignSelf: 'center',  // Added alignSelf
},

button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    alignSelf: 'center',  // Added alignSelf
},
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: '#FCCC7C',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjust the image resizing mode as needed
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  basketContent: {
    alignItems: 'center',
    width: '100%', // Decrease width to make BrandBox and ProductInfo components appear wider
    flexGrow: 1,
  },
  emptyBasketContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  width: '60%',
  alignSelf: 'center',
},

footerContainer: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
},
centerContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '60%',
},
  subtotal: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center', // Align text to center
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkoutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    alignItems: 'center', // Align items to center
  },
  space: {
    marginBottom: 100,
  },
  content: {
    width: '100%', // to take full width
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  boldBasketText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  boldText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
  },
  addIconContainer: {
    marginLeft: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomerBasket;