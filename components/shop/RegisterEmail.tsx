import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RegisterEmailProps = {
  navigation: StackNavigationProp<StackParamList, 'RegisterEmail'>;
};

const RegisterEmail: React.FC<RegisterEmailProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationInProcess, setVerificationInProcess] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [addedEmails, setAddedEmails] = useState([]);


  useEffect(() => {
    const getEmails = async () => {
      const storedEmails = await AsyncStorage.getItem('emails');
      if (storedEmails !== null) {
        setAddedEmails(JSON.parse(storedEmails));
      }
    };

    getEmails();
  }, []);

  useEffect(() => {
    const checkEmailVerification = async () => {
      const emailVerificationData = await AsyncStorage.getItem('emailVerification');
      if (emailVerificationData !== null) {
        const { email, inProcess } = JSON.parse(emailVerificationData);
        setVerificationEmail(email);
        setVerificationInProcess(inProcess);
      }
    };

    checkEmailVerification();
  }, []);

  useEffect(() => {
    const storeEmails = async () => {
      await AsyncStorage.setItem('emails', JSON.stringify(addedEmails));
    };

    storeEmails();
  }, [addedEmails]);

  const handleAddPress = async () => {
    if (email && !verificationEmail && addedEmails.length < 3) {
      setAddedEmails(prev => [...prev, { email, verified: false }]);
      setVerificationEmail(email);
      setEmail('');
      setVerificationInProcess(true);
      await AsyncStorage.setItem('emailVerification', JSON.stringify({ email, inProcess: true }));
      Alert.alert('A six-digit verification code has been sent to your e-mail address, if it exists.');
    } else if (verificationEmail) {
      Alert.alert('You must first verify your email');
    } else if (addedEmails.length >= 3) {
      Alert.alert('You can only add a maximum of 3 emails');
    }
  };

  const handleDeletePress = (emailToDelete: string) => {
    setShowModal(true);
    handleConfirmDelete(emailToDelete);
  };

  const handleConfirmDelete = (emailToDelete: string) => {
    setAddedEmails(prev => prev.filter(({ email }) => email !== emailToDelete));
    setShowModal(false);
  };

  const verificationCode2 = '123456';

  const handleVerify = async () => {
    if (verificationCode === verificationCode2) {
      setAddedEmails(prev => prev.map(({ email, verified }) => email === verificationEmail ? { email, verified: true } : { email, verified }));
      setVerificationEmail('');
      setVerificationCode('');
      setVerificationInProcess(false);
      await AsyncStorage.removeItem('emailVerification');
      Alert.alert('Success!', 'Your e-mail has been verified.');
      navigation.navigate('CustomerBasket', { email: verificationEmail });
    } else {
      Alert.alert('Verification code is incorrect. Please try again.');
    }
  };

  const handlePressSpinner = () => {
    Alert.alert('Check your e-mail for a 6-digit code, especially your spam folder.');
  };

  const handleResendCode = () => {
    Alert.alert(`Sent code to ${verificationEmail}. Check your spam folder.`);
  };

  return (
    <View style={styles.container}>
        <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
      <View style={styles.subscriptionInfo}>
        <Text style={styles.title}>Add or Delete Email Address</Text>
      </View>
        {addedEmails.map(({ email, verified }, index) => (
        <View key={index} style={styles.subscriptionInfo}>
          {verified ? (
            <AntDesign name="checkcircle" size={24} color="green" />
          ) : email === verificationEmail ? (
            <TouchableOpacity onPress={handlePressSpinner}>
              <ActivityIndicator size="small" color="#FF6347" />
            </TouchableOpacity>
          ) : null}
          <Text style={styles.addedEmail}>{email}</Text>
          <TouchableOpacity onPress={() => handleDeletePress(email)}>
            <Icon name="times" size={24} color="#FF6347" />
          </TouchableOpacity>
        </View>
      ))}
        <View style={styles.subscriptionInfo}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        </View>
        <View style={styles.subscriptionInfo}>
        <TouchableOpacity style={styles.button} onPress={handleAddPress}>
          <Text style={styles.buttonText}>Add Email</Text>
        </TouchableOpacity>
        </View>
        {!isVerified && verificationInProcess && (
          <>
            <View style={styles.subscriptionInfo}>
              <Text style={styles.title}>Enter your six digit code here:</Text>
            </View>
            <View style={styles.subscriptionInfo}>
              <TextInput
                style={styles.input}
                value={verificationCode} // changed from email to verificationCode
                onChangeText={text => {
                  // Ensures that the input is numeric only
                  const parsed = parseInt(text, 10);
                  if (!isNaN(parsed)) {
                    setVerificationCode(parsed.toString());
                  }
                }} // changed from setEmail to setVerificationCode
                placeholder="Please enter a 6 digit code"
                keyboardType="numeric"
                autoCapitalize="none"
                maxLength={6} // ensures that only 6 characters can be entered
              />
            </View>
            <View style={styles.subscriptionInfo}>
            <TouchableOpacity style={styles.button} onPress={handleVerify}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.subscriptionInfo}>
            <TouchableOpacity style={styles.button} onPress={handleResendCode}>
              <Text style={styles.buttonText}>Resend Code</Text>
            </TouchableOpacity>
            </View>
          </>
        )}

        <View style={styles.space}></View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        {/* Your Modal code */}
      </Modal>
      <ShopFooter navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  header: {
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  space: {
    paddingBottom: 120,
  },
  subscriptionInfo: {
    flexDirection: 'row', // Add this line
    justifyContent: 'space-between', // Add this line
    alignItems: 'center', // Add this line
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  addedEmail: {
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default RegisterEmail;
