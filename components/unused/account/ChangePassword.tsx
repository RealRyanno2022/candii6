import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ShopHeader from '../../shop/ShopHeader';
import { StackParamList } from '../../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import ShopFooter from '../../shop/ShopFooter';


type ChangePasswordProps = {
  navigation: NavigationProp<StackParamList>;
}



const ChangePassword: React.FC<ChangePasswordProps> = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Add logic to handle the password change
    // Make sure to validate the old password, and ensure the new password and confirm password match
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
    } else {
      // Add code to handle password change
    }
  }

  return (
    <View style={styles.container}>
        <ShopHeader navigation={navigation}  />
      <View style={styles.card}>
        <Text style={styles.cardText}>Change Password</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Old password"
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New password"
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
        <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    color: '#1F1F1F',
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1F1F1F',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChangePassword;