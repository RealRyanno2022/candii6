import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, SearchBar, Icon } from 'react-native-elements';
import ShopHeader from '../shop/ShopHeader';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type NotFoundScreenProps = {
  navigation: NavigationProp<StackParamList>;
}

const NotFoundScreen: React.FC<NotFoundScreenProps> = ({ navigation }) => {
  return (
    <View>
    <ShopHeader navigation={navigation} />
    <View style={styles.container}>
      <Text style={styles.title}>404 Not Found</Text>
      <Text style={styles.subtitle}>The page you are looking for does not exist.</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
});

export default NotFoundScreen;