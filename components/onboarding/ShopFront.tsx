import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import ShopFooter from '../shop/ShopFooter';
import ShopHeader from '../shop/ShopHeader';
import CustomerBasket from '../shop/CustomerBasket';
import { RouteProp } from '@react-navigation/native';



type ShopFrontProps = {
  navigation: StackNavigationProp<StackParamList, "CustomerBasket">;
  route: RouteProp<StackParamList, "CustomerBasket">;
  email: string;
};

const ShopFront: React.FC<ShopFrontProps> = ({ navigation, email }) => {
  const handleBrandPress = (productType: string) => {
    if (productType === 'Disposables') {
      navigation.navigate('VapeScreen');
    }
    if (productType === 'Juice') {
      navigation.navigate('JuiceScreen');
    }
    if (productType === 'NonDisposable') {
      navigation.navigate('NonDisposableScreen');
    }
    if (productType === 'Parts') {
      navigation.navigate('PartScreen');
    }
  };

  const navigateToBasket = () => {
    navigation.navigate('CustomerBasket', { email }); // use the correct screen name here
  };

  return (
    <View style={styles.container}>
          <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
      <ShopHeader navigation={navigation} bounces={false} />
      <ScrollView contentContainerStyle={styles.scrollViewContent} bounces={false} >
        <View style={styles.cardContainer}>
          <View style={styles.space} />
          <TouchableOpacity
            id="nondisposable"
            style={styles.card}
            onPress={() => handleBrandPress('NonDisposable')}
          >
            <Image
              source={require('../pictures/dragx.png')}
              style={styles.imageStyle}
            />
            <Text style={styles.cardText}>Non Disposables</Text>
          </TouchableOpacity>
          <TouchableOpacity
            id="disposables"
            style={styles.card}
            onPress={() => handleBrandPress('Disposables')}
          >
            <Image
              source={require('../pictures/VapePics/elfbar.png')}
              style={styles.imageStyle}
            />
            <Text style={styles.cardText}>Disposables</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            id="juice"
            style={styles.card}
            onPress={() => handleBrandPress('Juice')}
          >
            <Image
              source={require('../pictures/VapePics/juice.png')}
              style={styles.imageStyle}
            />
            <Text style={styles.cardText}>Juice</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            id="parts"
            style={styles.card}
            onPress={() => handleBrandPress('Parts')}
          >
            <Image
              source={require('../pictures/coil.png')}
              style={styles.imageStyle}
            />
            <Text style={styles.cardText}>Parts</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.space} />
        <View style={styles.space} />
      </ScrollView>
      <ShopFooter navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollViewContent: {
    flexGrow: 1,
  },
  space: {
    marginTop: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '80%',
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
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  imageStyle: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default ShopFront;