import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Header, SearchBar } from 'react-native-elements';
import ShopHeader from '../../shop/ShopHeader';
import ShopFooter from '../../shop/ShopFooter';

type ProjectInfoProps = {
  navigation: any;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ navigation }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    navigation.push('SearchProducts', { searchTerm });
  }
  return (
    <View style={{flex: 1}}>
      <ShopHeader navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.space} />
        <Text style={styles.cardText}>Project Info</Text>
        <Text style={styles.cardText}>Developed in React Native by Daniel Ryan, 2023</Text>
        <Text style={styles.cardText}>Features:</Text>
        <Text style={styles.cardText}>- Braintree SDK for payments </Text>
        <Text style={styles.cardText}>- Full account creation system with PostgreSQL</Text>
        <Text style={styles.cardText}>- Node and Express backend</Text>
        <Text style={styles.cardText}>- Full E-Commerce UI</Text>
        <View style={styles.space} />
      <TouchableOpacity style={styles.card} onPress={() => navigation.goBack()}>
          <Text style={styles.cardText}>Back</Text>
        </TouchableOpacity>
    </View>
    <ShopFooter navigation={navigation}/>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  space: {
    marginTop: 50,
  },
  card: {
    width: '100%',
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    color: '#1F1F1F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProjectInfo;