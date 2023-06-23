import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

type VerifyAgeProps = {
  navigation: any;
 }


const VerifyAge: React.FC<VerifyAgeProps> = ({ navigation }) => {
  const [isOver18, setIsOver18] = useState(false);

  const handleVerification = (isOver18: boolean) => {
    if (isOver18) {
      navigation.navigate('PrivacyPolicy');
    } else {
      Linking.openURL('https://www.who.int/news-room/questions-and-answers/item/tobacco-e-cigarettes');
    }
  };

  return (
    <View style={styles.container}>
            <Text style={styles.typingText}>You must be at least 18 years old in Ireland to purchase vape. We will ask for verification on your first purchase.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleVerification(true)}
      >
        <Text style={styles.buttonText}>Yes, I'm over 18</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleVerification(false)}
      >
        <Text style={styles.buttonText}>No, I'm under 18</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCCC7C',
    paddingHorizontal: 20, // give some padding from the sides
  },
  typingText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30, // bigger space after the text
    textAlign: 'center', // center the text
  },
  button: {
    backgroundColor: '#4C7B8B', // a more modern color
    paddingVertical: 15, // bigger padding
    paddingHorizontal: 30, // bigger padding
    borderRadius: 30, // fully rounded corners
    marginBottom: 20, // space between buttons
    shadowColor: "#000", // adding shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // text color that contrasts with the button color
    fontWeight: 'bold',
    textAlign: 'center', // center the text inside the button
  },
});

export default VerifyAge;
