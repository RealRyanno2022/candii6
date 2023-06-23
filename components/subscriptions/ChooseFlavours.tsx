import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import BrandBox from '../shop/BrandBox';
import BrandData from '../data/BrandData';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type BrandVarietiesProps = {
  route: {
    params: {
      brandName: string;
    };
  };
  navigation: NavigationProp<StackParamList>;
};


type BrandData = {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
};


const BrandVarieties: React.FC<BrandVarietiesProps> = ({ route, navigation }) => {
  const { brandName } = route.params;
  const [varieties, setVarieties] = useState<BrandData[]>([]);
  const [selectedVarieties, setSelectedVarieties] = useState<Record<string, number>>({});

  const isBrandData = (data: any): data is BrandData => {
    return data && data.id && typeof data.name === 'string' && typeof data.price === 'number' && typeof data.brand === 'string' && typeof data.image === 'string';
  };

  useEffect(() => {
    const dataAsArray = Object.entries(BrandData).map(([id, product]) => ({ id, ...product }));
    const filteredData = dataAsArray.filter(product => 'brand' in product && product.brand === brandName);
    const validatedData = filteredData.filter(isBrandData);
    setVarieties(validatedData);
  }, [brandName]);

  const handlePress = (id: string) => {
    setSelectedVarieties((prev) => {
      if (!prev[id]) {
        return { ...prev, [id]: 1 };
      } else if (prev[id] < 4) {
        return { ...prev, [id]: prev[id] + 1 };
      } else {
        return prev;
      }
    });
  };

  const handleDeselect = (id: string) => {
    setSelectedVarieties((prev) => {
      if (prev[id] === 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [id]: prev[id] - 1 };
      }
    });
  };

  return (
    <View>
    <ShopHeader navigation={navigation} />
    <ScrollView bounces={false}>
    <View style={styles.container}>
      
      <Text style={styles.title}>{brandName} Varieties</Text>
      <FlatList 
        data={varieties}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BrandBox
            product={item}
            navigation={navigation}
            selected={selectedVarieties[item.id] > 0}
            quantity={selectedVarieties[item.id] || 0}
            onSelect={() => handlePress(item.id)}
            onDeselect={() => handleDeselect(item.id)}
          />
        )}
      />
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

    </View>
    </ScrollView>
          <ShopFooter navigation={navigation}/>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      title: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#fb5b5a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
      listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
      },
  continueButton: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fb5b5a',
    alignItems: 'center',
    marginBottom: 20,
  },
  continueText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default BrandVarieties;