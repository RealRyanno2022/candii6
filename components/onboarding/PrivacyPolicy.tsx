
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

type PrivacyPolicyProps = {
  navigation: any;
}


const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigation }) => {
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);

  const handlePolicyAcceptance = () => {
    setIsPolicyAccepted(!isPolicyAccepted);
  };

  const handleContinue = () => {
    if (isPolicyAccepted) {
      // Handle logic to proceed further
      console.log('Continue button clicked');
      navigation.navigate('FormScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Privacy Policy</Text>
      </View>  
      <View style={styles.policyContainer}>
      <ScrollView style={styles.policyScrollView} bounces={false}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at rutrum ipsum. Cras pharetra vulputate mattis.
        </Text>
      </ScrollView>
    </View>


      <Text style={styles.acceptanceText}>I have read and accepted the Privacy Policy.</Text>
      <TouchableOpacity
        style={[styles.checkBox, isPolicyAccepted && styles.checkBoxSelected]}
        onPress={handlePolicyAcceptance}
      >
        {isPolicyAccepted && <Text style={styles.checkBoxText}>✓</Text>}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.continueButton, isPolicyAccepted && styles.continueButtonActive]}
        onPress={handleContinue}
        disabled={!isPolicyAccepted}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FCCC7C',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  policyContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  policyScrollView: {
    flex: 1,
  },
  acceptanceText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
  },
  policyContent: {
    padding: 10,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  checkBoxText: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'f5f5f5',
  },
  disabledCheckBox: {
    backgroundColor: 'f5f5f5',
  },
  continueButton: {
    width: 120,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9A9A9',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  continueButtonActive: {
    backgroundColor: '#D3D3D3',
  },
});

export default PrivacyPolicy;