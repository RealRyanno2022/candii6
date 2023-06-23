import { NavigationProp } from "@react-navigation/native";
import React from "react";


import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type BrandVarietiesProps = {
  route: RouteProp<StackParamList, 'BrandVarieties'>;
  navigation: StackNavigationProp<StackParamList, 'BrandVarieties'>;
  brandName: string;
};

type ProductImage = string;

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  type: 'juice' | 'disposable' | 'nonDisposable' | 'part';
  variableStrength: boolean;
  nicotineStrengths: string[];
  image: ProductImage;
};

type Subscription = {
  isSubscribed: boolean;
  setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StackParamList = {
  AccountInfo: { userId: number };
  CustomerBasket: { email?: string };
  EditEmail: undefined;
  EditEmailDeliveryAddress: undefined;
  // TestPayments: undefined;
  QueryLanguageSelector: { selectedLanguage: string }
  DeleteAccount: undefined;
  ProjectInfo: undefined;
  Queries: undefined;
  PartScreen: undefined;
  LanguageSelect: undefined;
  Intro: undefined;
  PrivacyPolicy: undefined;
  ReorderPage: undefined;
  ShopFront:undefined;
  VerifyAge: undefined;
  ForgotPassword: undefined;
  LoginScreen: undefined;
  NewPassword: undefined;
  SignUp: undefined;
  VerifyEmail: undefined;
  RegisterEmail: undefined;
  ConfirmationPage: undefined;
  DeliveryAddress: undefined;
  BrandVarieties: { brand: string };
  ContinueShopping: undefined;
  JuiceProductPage: { product: Product };
  NonDisposableProductPage: { product: Product };
  DisposableProductPage: { product: Product };
  JuiceScreen: undefined;
  SearchProducts: undefined;
  VapeScreen: undefined;
  FormScreen: undefined;
  SubSignUp: { subscription: Subscription, navigation: any, route: any };
  SubJuiceScreen: undefined;
  NotFoundScreen: undefined;
  ChooseFlavours: undefined;
  ManageSubscription: { subscription: Subscription };
  CancelMembership: undefined;
  ChangeAddress: undefined;
  ChangeFlavours: undefined;
  CancelConfirm: undefined;
  NonDisposableScreen: undefined;
  BrandBox: { product: any, selected: boolean, quantity: number, onSelect: () => void, onDeselect: () => void };
  ShopFooter: { subscription: Subscription };
};