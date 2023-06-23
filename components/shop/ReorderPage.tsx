import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ShopFooter from '../shop/ShopFooter';
import ShopHeader from '../shop/ShopHeader';
import BrandBox from './BrandBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ReorderPageProps = {
  navigation: StackNavigationProp<StackParamList>;
  route: RouteProp<StackParamList, 'ReorderPage'>;
}

const ReorderPage: React.FC<ReorderPageProps> = ({ navigation, route }) => {
  const [history, setHistory] = useState<Product[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const storedHistory = await AsyncStorage.getItem('purchaseHistory');
      if (storedHistory !== null) {
        setHistory(JSON.parse(storedHistory).reverse());
      }
    };

    fetchHistory();
  }, []);

  const handleContinue = () => {
    navigation.navigate('ShopFront');
  }

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Reorder</Text>
        <Text style={styles.subtitle}>Welcome back! Would you like to re-order?</Text>
        {history.map((product, index) => 
          <BrandBox
            key={index}
            product={product}
            selected={false}
            quantity={1}
            onSelect={() => {}}
            onDeselect={() => {}}
            navigation={navigation}
            navigateToPage="ProductPage" // replace with your product page
          />
        )}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue to Store</Text>
        </TouchableOpacity>
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
    scrollViewContent: {
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
      marginBottom: 20,
    },
    continueButton: {
      marginTop: 20,
      backgroundColor: '#FCCC7C',
      padding: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
    },
    continueButtonText: {
      fontSize: 18,
      color: '#fff',
    },
  });
  

export default ReorderPage;