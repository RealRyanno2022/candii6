import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../types/types';
import Icon from 'react-native-vector-icons/FontAwesome';

type EditEmailProps = {
  navigation: StackNavigationProp<StackParamList, 'EditEmail'>;
};

const EditEmail: React.FC<EditEmailProps> = ({ navigation }) => {
  const [verifiedEmails, setVerifiedEmails] = useState<string[]>([]);

  // Mock Function: Please replace it with real function to get verified emails.
  useEffect(() => {
    const fetchVerifiedEmails = async () => {
      const emails = ['email1@example.com', 'email2@example.com'];
      setVerifiedEmails(emails);
    };

    fetchVerifiedEmails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Switch Email Address</Text>
      {verifiedEmails.map((email, index) => (
        <View key={index} style={styles.emailRow}>
          <TouchableOpacity onPress={() => navigation.navigate('EditEmailDeliveryAddress')}>
            <Icon name="cog" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.emailText}>{email}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  addIconContainer: {
    marginLeft: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    marginLeft: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#48D1CC', // feel free to change this color
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    padding: 20,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emailText: {
    fontSize: 16,
  },
});

export default EditEmail;