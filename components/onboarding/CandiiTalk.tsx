import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';


type CandiiTalkProps = {
  navigation: any;
}

const CandiiTalk: React.FC<CandiiTalkProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
                 <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
        <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <Image source={require('../pictures/logosvg2.png')} style={styles.roundedLogo} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to Candii: </Text>
          <Text style={styles.headerText}>The responsible vape store</Text>
        </View>
        
        <Text style={styles.subscriptionInfo}>
          Candii is your trusted partner in a journey towards a healthier lifestyle. As a 100% Irish-owned business, we're redefining the vaping landscape by focusing on responsible vaping.
        </Text>

        <Image source={require('../pictures/vapeboxfinal.png')} style={styles.candiiLogo} />
        
        <Text style={styles.subscriptionInfo}>
          We proudly collaborate with the Vape Redemption Project, a social entrepreneurship company that recycles e-cigarette batteries. We also have a smaller carbon footprint compared to traditional vape stores.
        </Text>

        <Image source={require('../pictures/earthfinal2.gif')} style={styles.candiiLogo} />

        <Text style={styles.subscriptionInfo}>
            We support seven different languages on our platform, making it effortless for anyone to navigate our offerings.
        </Text>

        <Image source={require('../pictures/vapegood2.png')} style={styles.photo2} />

        <Text style={styles.subscriptionInfo}>
        We provide a nicotine concentration range from 3mg to 20mg of nicotine. This provides a flexible route to gradual nicotine reduction, allowing for a smoother and more manageable transition.
        </Text>

        <Image source={require('../pictures/vapepile.png')} style={styles.photo2} />

        <Text style={styles.subscriptionInfo}>
        Contact us through Instagram!
        </Text>

        <TouchableOpacity style={styles.insta} onPress={() => Linking.openURL('https://www.instagram.com/candii.vapes/?hl=en')}>
          <Icon name="instagram" size={150} color="white" />
        </TouchableOpacity>
        <View style={styles.space} />
      </ScrollView>
      <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  roundedLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 100, // Adjust the radius value as per your preference
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjust the image resizing mode as needed
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  subscriptionInfo: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    fontSize: 18,
    
  },
  scrollView: {
    alignItems: 'center',
    padding: 20,
  },
  space: {
    marginTop: 100,
  },
  insta: {
    alignItems: "center",
  },
  candiiLogo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  photo2: {
    height: 280,
    width: '100%',
    resizeMode: 'contain',
  },
  header: {
    marginBottom: 20,
    marginTop: 20,
    alignItems:'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  policyContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
});

export default CandiiTalk;