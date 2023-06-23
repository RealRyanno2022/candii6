import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ShopHeader from './ShopHeader';
import BrandData from '../data/BrandData';
import ShopFooter from './ShopFooter';
import { NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


type ProductType = {
  id: string;
  name: string;
  price: number;
  brand?: string; // Make brand property optional
  image: string;
};

type JuiceScreenProps = {
  navigation: StackNavigationProp<StackParamList, "JuiceScreen">;
}

const JuiceScreen: React.FC<JuiceScreenProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleBrandPress = (brand: string) => {
    navigation.dispatch(StackActions.push('BrandVarieties', { brand, type: 'juice' }));
  };



  const brands = [
    { name: "Kinship", image: require('../pictures/JuiceScreen/kinship.png') },
    { name: "BMG", image: require('../pictures/JuiceScreen/bmg.png') },
    { name: "Hale", image: require('../pictures/JuiceScreen/hale3.png') },
    { name: "Slushie", image: require('../pictures/JuiceScreen/slushie.png') },
    { name: "Yeti", image: require('../pictures/JuiceScreen/yeti.png') },
    { name: "IVG Salt", image: require('../pictures/VapePics/juice.png') },
    { name: "Elfiq", image: require('../pictures/JuiceScreen/elfiq.png') },
  ];


  return (
    <View style={{flex: 1}}>
              <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
    <ShopHeader navigation={navigation} />
     <ScrollView bounces={false}>
       <View style={styles.cardContainer}>
         {brands.map(brand => (
           <TouchableOpacity
             key={brand.name}
             style={styles.card}
             onPress={() => handleBrandPress(brand.name)}
           >
             <Image style={styles.image} source={brand.image}></Image>
             <Text style={styles.cardText}>{brand.name}</Text>
           </TouchableOpacity>
         ))}
       </View>
       <View style={styles.space} />
     </ScrollView>
     <ShopFooter navigation={navigation}/>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
  space: {
    marginBottom: 50,
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
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  card: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
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
  buffer: {
    marginBottom: 150,
  },
});

export default JuiceScreen;