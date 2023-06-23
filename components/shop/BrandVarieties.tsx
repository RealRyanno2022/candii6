import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import BrandBox from './BrandBox';
import BrandData, { BrandProduct } from '../data/BrandData';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type BrandVarietiesProps = {
  route: RouteProp<StackParamList, 'BrandVarieties'>;
  navigation: StackNavigationProp<StackParamList, 'BrandVarieties'>;
};

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  type: 'juice' | 'disposable' | 'nonDisposable' | 'part';
  variableStrength: boolean;
  image: string;
};

const BrandVarieties: React.FC<BrandVarietiesProps> = ({ route, navigation }) => {
  const [varieties, setVarieties] = useState<Product[]>([]);

  useEffect(() => {
    console.log('BrandVarieties is being rendered');
    if (route.params) {
      const { brand } = route.params;
      loadBrandsData(brand);
    }
  }, [route.params]);

  const loadBrandsData = (brand: string) => {
    // Filter out the products of the specified brand.
    const brandProducts = Object.values(BrandData).filter(product => product.brand === brand);

    setVarieties(brandProducts);
  }

  const reloadData = () => {
    navigation.navigate('ShopFront');
  }

  const handleSelectProduct = (product: Product) => {
    const type = product.type;
    switch(type) {
      case 'juice':
        navigation.navigate('JuiceProductPage', { product });
        break;
      case 'nonDisposable':
        navigation.navigate('NonDisposableProductPage', { product });
        break;
      default:
        navigation.navigate('DisposableProductPage', { product });
        break;
    }
  };

  const brand = route.params?.brand ?? 'Unknown';

  return (
    <View style={styles.container}>
                <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
      <ShopHeader navigation={navigation} />
      <Text style={styles.title}>{brand} Varieties</Text>
      <View style={styles.basketContent}>
        {varieties.length > 0 ? (
          <FlatList 
            style= {{ width: '60%' }}
            showsVerticalScrollIndicator={false}
            data={varieties}
            keyExtractor={(item, index) => 'key' + index}
            bounces={false}
            ListFooterComponent={<View style={{ height: 75 }} />}
            renderItem={({ item }) => (
              <BrandBox 
                navigation={navigation} 
                quantity={0}
                onSelect={() => handleSelectProduct(item)}
                onDeselect={() => {}}
                product={item}
                selected={false}
              />
            )}
          />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.noBrandTitle}>No varieties loaded.</Text>
            <TouchableOpacity style={styles.button} onPress={reloadData}>
              <Text style={styles.buttonText}>Reload</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.footerContainer}>
        <ShopFooter navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  basketContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
  noBrandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
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
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BrandVarieties;