import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import BraintreeDropIn from 'react-native-braintree-payments-drop-in';

const TestPayments = () => {

  const onSubmit = async () => {
    try {
      const clientToken = await fetch('https://candii4-backend-b3355261cd2a.herokuapp.com/client_token')
        .then(response => response.text());

      const nonce = await BraintreeDropIn.show({
        clientToken,
      });

      const response = await fetch('https://candii4-backend-b3355261cd2a.herokuapp.com/execute_transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodNonce: nonce,
          amount: '1.00',
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed'); 
      }

      const { message } = await response.json();
      console.log(message);
    } catch (error) {
      console.error(error);
      alert('Payment failed... please try again');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.card}>
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Confirm and Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
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
  button: {
    backgroundColor: '#FCCC7C',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    width: '100%',
  }
});

export default TestPayments;
