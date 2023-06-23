import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import BrandBox from '../shop/BrandBox';
import BrandData from '../data/BrandData';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

// Assuming BrandData looks like { [id: string]: Product }
type Product = {
  id: string,
  brand: string,
  name: string,  // new
  price: number, // new
  image: string, // new
  [key: string]: any, // You may remove this if there are no other properties in the Product type
}

type ChangeFlavoursProps = {
  route: {
    params: {
      brandName: string;
    };
  };
  navigation: NavigationProp<StackParamList>;
};

const ChangeFlavours: React.FC<ChangeFlavoursProps> =  ({ route, navigation }) => {
  const [selectedFlavours, setSelectedFlavours] = useState(['Cola0']);
  const flavours: string[] = ['Cola0', 'Cola1', 'Cola2', 'Cola3'];

  const { brandName } = route.params;
  const [varieties, setVarieties] = useState<Product[]>([]);
  const [selectedVarieties, setSelectedVarieties] = useState<Record<string, number | undefined>>({});

  useEffect(() => {
    const dataAsArray = Object.entries(BrandData).map(([id, product]) => ({ ...(product as Product) }));
    const filteredData = dataAsArray.filter(product => product.brand === brandName);
    setVarieties(filteredData);
  }, [brandName]);

  const handlePress = (id: string) => {
    setSelectedVarieties((prev) => {
      if (!prev[id]) {
        return { ...prev, [id]: 1 };
      } else if (prev[id]! < 4) {
        return { ...prev, [id]: prev[id]! + 1 };
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
      } else if (prev[id] && prev[id]! > 1) {
        return { ...prev, [id]: prev[id]! - 1 };
      } else {
        return prev;
      }
    });
  };

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Change Flavours</Text>

        <FlatList
          data={varieties} // Use varieties instead of flavours
          keyExtractor={(item) => item.id} // item is Product now
          renderItem={({ item }) => (
            <BrandBox
              navigation={navigation}
              product={item}
              selected={selectedFlavours.includes(item.id)}
              quantity={selectedFlavours.filter((flavour) => flavour === item.id).length}
              onSelect={() => handlePress(item.id)}
              onDeselect={() => handleDeselect(item.id)}
            />
          )}
        />

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.dispatch(StackActions.push('ManageSubscription', { selectedFlavours }))}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <ShopFooter navigation={navigation} />
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

export default ChangeFlavours;