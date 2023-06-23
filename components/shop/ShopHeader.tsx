import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation, useNavigationState, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../types/types';

type ShopHeaderProps = {
  navigation: NavigationProp<StackParamList>;
};

const ShopHeader: React.FC<ShopHeaderProps> = ({ navigation }) => {
  const canGoBack = navigation.canGoBack();
  const noGoBackRoutes = ['ShopFront','SubSignUp','ManageSubscription','CandiiTalk','CustomerBasket'];
  const currentRouteName = useNavigationState(state => state.routes[state.index].name);
  const shouldRenderGoBack = canGoBack && !noGoBackRoutes.includes(currentRouteName);

  const goBack = () => {
    if (canGoBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.headerColor}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {shouldRenderGoBack && (
            <TouchableOpacity onPress={goBack}>
              <Image source={require('../pictures/goback.png')} style={styles.image2} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.logoContainer}>
          <Image source={require('../pictures/icon.png')} style={styles.image} />
        </View>
        <View style={styles.rightContainer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerColor: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FCCC7C',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  image: {
    height: 100,
    width: 100,
  },
  image2: {
    height: 40,
    width: 40,
    tintColor: '#FFA500',
    
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    width: '33%',
    alignItems: 'flex-start',
  },
  logoContainer: {
    width: '33%',
    alignItems: 'center',
  },
  rightContainer: {
    width: '33%',
    alignItems: 'flex-end',
  }
})

export default ShopHeader;