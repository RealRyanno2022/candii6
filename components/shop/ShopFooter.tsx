import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { NavigationContainerRef } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ShopFooterProps = {
  navigation: NavigationProp<StackParamList>;
  style?: Object;
}

const ShopFooter: React.FC<ShopFooterProps> = ({ navigation, style }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const route = useRoute();

  const componentNames = ['BrandVarieties','JuiceProductPage','SearchProducts','NonDisposableScreen','NonDisposableProductPage','BrandVarieties','PartScreen','PartProductPage','ContinueShopping','ProductPage','ShopFront', 'VapeScreen', 'JuiceScreen'];
  const signUpComponentNames = ["SubSignUp", "YourFlavours","ManageSubscription","SubVapeScreen","ChooseFlavours"];
  const isQueryLanguageSelectorComponent = route?.name === 'QueryLanguageSelector';
  const isShopComponent = componentNames.includes(route?.name);
  const isAccountInfoComponent = route?.name === 'AccountInfo';
  const isSubSignUpComponent = signUpComponentNames.includes(route?.name);
  const subscription = { isSubscribed, setIsSubscribed };
  const isCandiiTalkComponent = route?.name === 'CandiiTalk';
  const isCustomerBasketComponent = route?.name === 'CustomerBasket';

  useEffect(() => {
    if (isShopComponent) {
      AsyncStorage.setItem('lastShopTab', route?.name);
    }
  }, [isShopComponent, route]);

  const focusListener = useRef<(() => void) | null>(null);

  useEffect(() => {
    focusListener.current = navigation.addListener('focus', () => {
      // Update the active tab state based on the current route
      if (componentNames.includes(route.name)) {
        setActiveTab('home');
      } else if (route.name === 'CandiiTalk') {
        setActiveTab('candii');
      } else if (route.name === 'CustomerBasket') {
        setActiveTab('basket');
      } else if (signUpComponentNames.includes(route.name)) {
        setActiveTab('vape');
      } else {
        setActiveTab('');
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      focusListener.current?.();
    };
  }, [navigation, route]);

  const handleVapePress = async () => {
    if (isSubscribed) {
      await AsyncStorage.setItem('lastTab', 'ManageSubscription');
      navigation.dispatch(StackActions.push('ManageSubscription', { subscription }));
    } else {
      await AsyncStorage.setItem('lastTab', 'SubSignUp');
      navigation.dispatch(StackActions.push('SubSignUp', { subscription }));
    }
  }

  if (isShopComponent) {
    AsyncStorage.setItem('lastShopTab', route?.name);
  }

  const onPressHome = async () => {
    setActiveTab(''); // Reset activeTab state when home is pressed
    const lastShopTab = await AsyncStorage.getItem('lastShopTab');
    if (lastShopTab) {
      navigation.navigate(lastShopTab as any);
    } else {
      navigation.navigate('ShopFront');
    }
    setTimeout(() => setActiveTab('home'), 0); // Set it back to home after the navigation has finished
}

  return (
    <View style={style}>
      <SafeAreaView style={styles.container}>
        <View style={styles.footerContent}>
          {/* {activeTab === 'home' && <View style={[styles.activeTabLine, styles.activeTabLineOverlay]} />} */}
          <TouchableOpacity
            onPress={onPressHome}
            disabled={isShopComponent}
            style={styles.iconContainer}>
            <Image
              source={require('../pictures/haus-removebg-preview.png')}
              style={[styles.icon, isShopComponent && styles.disabledIcon]}
            />
            {activeTab === 'home' && <View style={styles.activeTabLineOverlay} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => { setActiveTab('candii'); navigation.dispatch(StackActions.push('CandiiTalk')); }}
            disabled={isCandiiTalkComponent}>
            {activeTab === 'candii' && <View style={[styles.activeTabLine, styles.activeTabLineOverlay]} />}
            <Image
              source={require('../pictures/heart.png')}
              style={[styles.icon, isCandiiTalkComponent && styles.disabledIcon]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => { setActiveTab('basket'); navigation.navigate('CustomerBasket', { email: 'example@example.com' }); }}
            disabled={isCustomerBasketComponent}>
            {activeTab === 'basket' && <View style={styles.activeTabLine} />}
            <Image
              source={require('../pictures/basket-removebg-preview.png')}
              style={[styles.icon, isCustomerBasketComponent && styles.disabledIcon]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleVapePress}
            disabled={isSubSignUpComponent}>
            {activeTab === 'vape' && <View style={styles.activeTabLine} />}
            <Image
              source={require('../pictures/vape-removebg-preview.png')}
              style={[styles.icon, isSubSignUpComponent && styles.disabledIcon]}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  activeTabLine: {
    width: 25,
    height: 4,
    backgroundColor: 'orange',
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -12.5 }],
  },
  activeTabLineOverlay: {
    width: 25,
    height: 4,
    backgroundColor: 'orange',
    position: 'absolute',
    top: -16,
    left: '50%',
    transform: [{ translateX: -12.5 }],
    opacity: 0.6,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },
  disabledIcon: {
    tintColor: '#FCCC7C',
  },
});

export default ShopFooter;
