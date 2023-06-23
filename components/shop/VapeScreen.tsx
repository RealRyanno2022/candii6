import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type VapeScreenProps = {
  navigation: StackNavigationProp<StackParamList>;
  brand: string;
}

const VapeScreen: React.FC<VapeScreenProps> = ({ navigation }) => {

  const brands = [
    // { name: "Elfa Bar", image: require('../pictures/DisposablePics/elfabar.png') },
    { name: "Jewel Mini", image: require('../pictures/DisposablePics/jewelmini.png') },
    { name: "Lost Mary", image: require('../pictures/DisposablePics/lostmary.png') },
    { name: "Elf Bar", image: require('../pictures/VapePics/elfbar.png') },
    { name: "IVG Bar", image: require('../pictures/DisposablePics/ivgbar.png') },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleBrandPress = (brand: string) => {
    navigation.dispatch(StackActions.push('BrandVarieties', { brand, type: 'disposable' }));
  };


  return (
    <View style={styles.container}>
                      <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
     <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
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
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCCC7C',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    
  },
  space: {
    marginBottom: 50,
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
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#FCCC7C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FB5B5A',
  },
  image: {
      width: '100%', 
      height: 100,
      resizeMode: 'contain',
      marginBottom: 10,
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
});

export default VapeScreen;