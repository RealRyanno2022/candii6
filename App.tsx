import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Onboarding components
import Intro from './components/onboarding/Intro';
import PrivacyPolicy from './components/onboarding/PrivacyPolicy';
import LanguageSelect from './components/onboarding/LanguageSelect';
import ShopFront from './components/onboarding/ShopFront';
import VerifyAge from './components/onboarding/VerifyAge';

import IDCheckScreen from './components/sales/IDCheckScreen';

import CustomerBasket from './components/shop/CustomerBasket';
// import SearchProducts from './components/shop/SearchProducts';

// Shop components
import VapeScreen from './components/shop/VapeScreen';
import JuiceScreen from './components/shop/JuiceScreen';
import NonDisposableScreen from './components/shop/NonDisposableScreen';
import BrandVarieties from './components/shop/BrandVarieties';

// Anomaly components
import LostConnection from './components/anomalies/LostConnection';
import NotFoundScreen from './components/anomalies/NotFoundScreen';

// Sales components
import ConfirmationPage from './components/sales/ConfirmationPage';
import DeliveryAddress from './components/sales/DeliveryAddress';
import FormInput from './components/sales/FormInput';
import JuiceProductPage from './components/shop/JuiceProductPage';
import NonDisposableProductPage from './components/shop/NonDisposableProductPage';

// Subscriptions components
import CancelConfirm from './components/subscriptions/CancelConfirm';
import CancelMembership from './components/subscriptions/CancelMembership';
import ChangeAddress from './components/subscriptions/ChangeAddress';
import ChangeFlavours from './components/subscriptions/ChangeFlavours';
import ManageSubscription from './components/subscriptions/ManageSubscription';
import SubJuiceScreen from './components/subscriptions/SubJuiceScreen';
import ChooseFlavours from './components/subscriptions/ChooseFlavours';
import SubSignUp from './components/subscriptions/SubSignUp';
import RegisterEmail from './components/shop/RegisterEmail';

import CandiiTalk from './components/onboarding/CandiiTalk';
import PartScreen from './components/shop/PartScreen';
import EditEmail from './components/shop/EditEmail';
import EditEmailDeliveryAddress from './components/shop/EditEmailDeliveryAddress';

import DisposableProductPage from './components/shop/DisposableProductPage';
import ReorderPage from './components/shop/ReorderPage';
// import TestPayments from './components/sales/TestPayments';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DeliveryAddress">
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="CandiiTalk" component={CandiiTalk} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
        <Stack.Screen name="ReorderPage" component={ReorderPage} />
        <Stack.Screen name="EditEmail" component={EditEmail} />
        <Stack.Screen name="EditEmailDeliveryAddress" component={EditEmailDeliveryAddress} />
        <Stack.Screen name="ShopFront" component={ShopFront} />
        <Stack.Screen name="VerifyAge" component={VerifyAge} />
        <Stack.Screen name="VapeScreen" component={VapeScreen} />
        <Stack.Screen name="JuiceScreen" component={JuiceScreen} />
        <Stack.Screen name="NonDisposableScreen" component={NonDisposableScreen} />
        <Stack.Screen name="LostConnection" component={LostConnection} />
        <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} />
        <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
        <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
        <Stack.Screen name="CustomerBasket" component={CustomerBasket} />
        <Stack.Screen name="IDCheckScreen" component={IDCheckScreen} />

        <Stack.Screen name="PartScreen" component={PartScreen} />

        <Stack.Screen name="FormInput" component={FormInput} />
        <Stack.Screen name="BrandVarieties" component={BrandVarieties} />
        <Stack.Screen name="CancelConfirm" component={CancelConfirm} />
        <Stack.Screen name="CancelMembership" component={CancelMembership} />
        <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
        <Stack.Screen name="ChangeFlavours" component={ChangeFlavours} />
        <Stack.Screen name="ChooseFlavours" component={ChooseFlavours} />
        <Stack.Screen name="ManageSubscription" component={ManageSubscription} />
        <Stack.Screen name="SubJuiceScreen" component={SubJuiceScreen} />
        <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} />
        <Stack.Screen name="SubSignUp" component={SubSignUp} />
{/* 
        <Stack.Screen
          name="SearchProducts"
          component={SearchProducts}
          options={{ headerShown: false }}  // This hides the header for the SearchProducts screen
        /> */}

        <Stack.Screen name="DisposableProductPage" component={DisposableProductPage} />
        <Stack.Screen name="JuiceProductPage" component={JuiceProductPage} />
        <Stack.Screen name="NonDisposableProductPage" component={NonDisposableProductPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;