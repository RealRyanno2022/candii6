import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type ChangeAddressProps = {
  navigation: NavigationProp<StackParamList>;
}

const ChangeAddress: React.FC<ChangeAddressProps> = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = () => {
    // Update user's address and navigate to next screen
    navigation.dispatch(StackActions.push("ManageSubscription"));
  };

  return (
    <View>
        <ShopHeader navigation={navigation} />
    
    <View style={styles.container}>

      <View style={styles.card}>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Postcode"
            value={postcode}
            onChangeText={setPostcode}
          />
        </View>

        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
        </View>

        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
          />
        </View>

        <TouchableOpacity style={styles.label} onPress={handleSubmit}>
          <Text style={styles.labelText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
      <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 24,
  },
  asterisk: {
    fontSize: 16,
    color: 'red',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexGrow: 1,
  },
  space: {
    marginTop: 150,
  },
  card: {
    width: '90%',
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
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    color: '#1F1F1F',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',  // Add this line
    paddingTop: 50,  // Add some padding top to align card in the center
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});

export default ChangeAddress;