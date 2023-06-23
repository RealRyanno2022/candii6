import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { StackActions } from '@react-navigation/native';

type LazySubSignUpContentProps = {
  navigation: any; // Replace with the appropriate type
};

const LazySubSignUpContent: React.FC<LazySubSignUpContentProps> = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImageTop}
      />
      <Image
        source={require('../pictures/smoke3.png')}
        style={styles.backgroundImageBottom}
      />
      <View style={styles.content}>
        <View style={styles.subscriptionInfo}>
          <Text style={styles.subscriptionInfoHeader}>Try our Juice Pass!</Text>
          <Text style={styles.subscriptionInfoDescription}>
            Get a discounted e-juice every week!
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../pictures/VapePics/juice.png')} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.dispatch(StackActions.push('SubJuiceScreen'))}>
          <Text style={styles.signUpButtonText}>Subscribe</Text>
        </TouchableOpacity>
        <View style={styles.subscriptionInfo}>
          <Text style={styles.subscriptionInfoHeader}>What do I get?</Text>
          <Text style={styles.subscriptionInfoDescription}>
            Get a juice of your choice each week, hassle-free!
          </Text>
        </View>
        <View style={styles.subscriptionInfo}>
          <Text style={styles.subscriptionInfoHeader}>Why Vape Pass?</Text>
          <Text style={styles.subscriptionInfoDescription}>
            Save a fortune on shipping and have your flavors delivered automatically. You can cancel your subscription at any time.
          </Text>
        </View>
        <View style={styles.subscriptionInfo}>
          <Text style={styles.subscriptionInfoHeader}>Can I change flavors?</Text>
          <Text style={styles.subscriptionInfoDescription}>
            Of course! You can change your flavors at any time.
          </Text>
        </View>
        <View style={styles.subscriptionInfo}>
          <Text style={styles.subscriptionInfoHeader}>What varieties are there?</Text>
          <Text style={styles.subscriptionInfoDescription}>
            Any e-juice flavor we sell is available.
          </Text>
        </View>
        <View style={styles.subscriptionInfo}>
          <Text style={styles.subscriptionInfoHeader}>How much is it?</Text>
          <Text style={styles.subscriptionInfoDescription}>
            The Vape Pass costs €23.99 a month.
          </Text>
          
        </View>
        <View style={styles.space}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    height: 225,
    width: 250,
    borderRadius: 10,
  },
  backgroundImageTop: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
    top: 0,
  },
  backgroundImageBottom: {
    position: 'absolute',
    width: '100%',
    height: '55%', // Increased to overlap
    resizeMode: 'cover',
    top: '45%', // Set to allow overlap
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  space: {
    marginBottom: 50,
  },
  subscriptionInfo: {
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: '100%',  // You can adjust this value to suit your needs
},
  subscriptionInfoHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
  },
  subscriptionInfoDescription: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
  },
  signUpButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: 200,
  },
  signUpButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Bold',
  },
});

export default LazySubSignUpContent;
