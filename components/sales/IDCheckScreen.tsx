import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';

type IDCheckScreenProps = {
  navigation: any;
};

const IDCheckScreen: React.FC<IDCheckScreenProps> = ({ navigation }) => {
  const [idImage, setIdImage] = useState('');

  const handleIdUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        Alert.alert('Image picker cancelled', 'You need to upload your ID for verification. Please try again.');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Image picker error', `Error picking image: ${response.errorMessage}`);
      } else {
        if (response.assets && response.assets[0] && response.assets[0].uri) {
          setIdImage(response.assets[0].uri);
          // Simulating a call to backend server for ID verification
          setTimeout(() => {
            const verificationPassed = Math.random() < 0.5;
            if (verificationPassed) {
              Alert.alert('Verification Success', 'Your ID has been verified. Happy shopping!');
              navigation.navigate('DeliveryAddress');
            } else {
              Alert.alert('Verification Failure', 'Unfortunately, you have failed the ID test.');
              navigation.navigate('ShopFront');
            }
          }, 2000);
        }
      }
    });
  };

  return (
    <View>
    <ShopHeader navigation={navigation} />
    <View style={styles.container}>
 
      <Text style={styles.headerText}>ID Check</Text>
      <Text style={styles.subText}>
        In Ireland, you must be at least 18 years old to purchase e-cigarettes, e-juice or related products.
        To prove you can legally buy from us, we require a quick ID verification check for this name and e-mail address.
        It shouldn't take longer than a minute. Candii does not store your ID beyond this.
      </Text>
      <Text style={styles.subText}>
        Valid forms of identification include: Your driver's license, passport or identity card.
        The most important thing is that we can verify you are over 18 years of age. Please note that using fake 
        identification to purchase our products is against the law.
      </Text>
      <TouchableOpacity onPress={handleIdUpload} style={styles.idUploadButton}>
        <Icon name="upload" size={30} color="white" />
        <Text style={styles.idUploadButtonText}>Upload ID</Text>
      </TouchableOpacity>
      {idImage.length > 0 && <Text style={styles.idUploadStatusText}>ID uploaded. Verifying...</Text>}

    </View>
          <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FCCC7C',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  subText: {
    fontSize: 16,
    marginBottom: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  idUploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
  },
  idUploadButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  idUploadStatusText: {
    marginTop: 20,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default IDCheckScreen;