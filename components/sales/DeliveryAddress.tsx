import React, { useState, useEffect, useRef } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SQIPCardEntry } from 'react-native-square-in-app-payments';
import axios from 'axios';

import ShopHeader from '../shop/ShopHeader';
import FormInput from './FormInput';

type UserData = {
  state: string;
  country: string;
  email: string;
  address: string;
  phoneNumber: string;
  postCode: string;
  firstName: string;
  lastName: string;
  addressLineTwo: string;
};

type DeliveryAddressProps = {
  navigation: any;
};

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ navigation }) => {
  const { control, handleSubmit } = useForm<UserData>();
  const [country, setCountry] = useState('');

  const fields = [
    { name: 'firstName', label: 'First Name', placeholder: 'First name' },
    { name: 'lastName', label: 'Last Name', placeholder: 'Last name' },
    { name: 'email', label: 'Email', placeholder: 'Email' },
    { name: 'phoneNumber', label: 'Phone Number', placeholder: 'Phone number' },
    { name: 'address', label: 'Address', placeholder: 'House / Apartment Number' },
    { name: 'addressLineTwo', label: 'Address Line 2', placeholder: 'Street' },
    { name: 'addressLineThree', label: 'Address Line 3', placeholder: 'Town / City' },
    { name: 'state', label: 'State', placeholder: 'County / State' },
    { name: 'country', label: 'Country', placeholder: 'Country', setCountry },
    { name: 'postCode', label: 'Post Code', placeholder: 'Post code' },
    { name: 'cardNumber', label: 'Card Number', placeholder: 'Card number' },
    { name: 'expirationMonth', label: 'Expiration Month', placeholder: 'MM' },
    { name: 'expirationYear', label: 'Expiration Year', placeholder: 'YYYY' },
    { name: 'cvv', label: 'CVV', placeholder: 'CVV' },
  ];

  const axiosInstance = axios.create({
    strictSSL: false,
    validateStatus: () => true,
  });

  const saveUserInformation = async (data: UserData) => {
    try {
      await axiosInstance.post('https://candii4-backend2-3f9abaacb350.herokuapp.com/save_user_information', data);
    } catch (error: any) {
      if (error.response) {
        console.log('Server responded with:', error.response.status);
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error occurred:', error.message);
      }
      throw error;
    }
  };

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    console.log('onSubmit pressed');
    await saveUserInformation(data);
    await startSquareCardEntry();
  };

  const startSquareCardEntry = async () => {
    try {
      const result = await SQIPCardEntry.startCardEntryFlow();
      if (result.isSuccess) {
        // Handle successful card entry
        console.log('Card entry successful:', result.cardDetails);
      } else if (result.isCanceled) {
        // Handle canceled card entry
        console.log('Card entry canceled');
      } else {
        // Handle card entry error
        console.log('Card entry error:', result.error);
      }
    } catch (error) {
      // Handle card entry exception
      console.log('Card entry exception:', error);
    }
  };
  

  

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <ShopHeader navigation={navigation} />
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }} bounces={false}>
            <View style={{ paddingBottom: 100 }}>
              <Text style={styles.sectionTitle}>Delivery Info</Text>
              {fields.slice(0, 10).map((field) => (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  control={control}
                  style={styles.formFieldsText}
                  setCountry={field.setCountry} // If setCountry is not defined, it won't affect anything
                />
              ))}
              <Text style={styles.sectionTitle}>Payment Info</Text>
              {fields.slice(10).map((field) => (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  control={control}
                  style={styles.formFieldsText}
                  setCountry={field.setCountry} // If setCountry is not defined, it won't affect anything
                />
              ))}
              <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                <Text style={styles.buttonText}>Confirm and Pay</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FCCC7C',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    alignSelf: 'center',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 50,
    backgroundColor: '#E76F51',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  formFieldsText: {
    height: 60,
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    fontSize: 16,
    color: '#333',
  },
});

export default DeliveryAddress;
