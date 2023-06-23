import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type CancelMembershipProps = {
  navigation: NavigationProp<StackParamList>;
  route: {
    params: {
      isSubscribed: boolean;
      setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
    };
  };

}

const CancelMembership: React.FC<CancelMembershipProps> = ({ navigation, route }) => {
  const { isSubscribed, setIsSubscribed } = route.params;
  const handleContinue = () => {
    navigation.dispatch(StackActions.push("ShopFront"));  // Replace with the actual route name
  };

  const handleCancel = () => {
    navigation.dispatch(StackActions.push('CancelConfirm', { isSubscribed, setIsSubscribed }));
  };

  return (
    <View>
        <ShopHeader navigation={navigation} />
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure?</Text>
      <Text style={styles.text}>
        We value you as a member and we would love to continue serving you with our vast range of flavours and convenient delivery. 
        Remember, you enjoy free shipping as part of your membership!
      </Text>

      <Text style={styles.text}>
        We understand if you need to cancel, and assure you that you can do so at any time.
      </Text>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue Membership</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelText}>Cancel Membership</Text>
      </TouchableOpacity>
    </View>
        <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  continueButton: {
    padding: 15,
    backgroundColor: '#fb5b5a',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  continueText: {
    color: 'white',
    fontSize: 18,
  },
  cancelButton: {
    padding: 15,
    backgroundColor: '#bbb',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CancelMembership;