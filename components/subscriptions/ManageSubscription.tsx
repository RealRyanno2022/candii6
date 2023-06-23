import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';
// import Carousel from 'react-native-snap-carousel'; // you need to install this
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type ManageSubscriptionProps = {
  navigation: NavigationProp<StackParamList>;
  user: any;
}

const ManageSubscription: React.FC<ManageSubscriptionProps> = ({ navigation, user }) => {
  var [subscription, setSubscription] = useState({ type: "monthly" });
    const [isSubscribed, setIsSubscribed] = useState(user.subscription);
    const [flavours, setFlavours] = useState(user.flavours);

    // const dummyUser = {
    //     subscription: {
    //       type: 'monthly',
    //     },
    //     flavours: [
    //       {
    //         image: require("https://s3.amazonaws.com/candii-bucket/pictures/VapePics/Cola.png"),
    //       },
    //       {
    //         image: require("https://s3.amazonaws.com/candii-bucket/pictures/VapePics/Cola.png"),
    //       },
    //       {
    //         image: require("https://s3.amazonaws.com/candii-bucket/pictures/VapePics/Cola.png"),
    //       },
    //       {
    //         image: require("https://s3.amazonaws.com/candii-bucket/pictures/VapePics/Cola.png"),
    //       },
    //     ],
    //   }



    // const renderItem = ({item: string, index: number}) => {
    //     return (
    //         <View style={styles.slide}>
    //             <Image source={{uri: item.image}} style={styles.image} />
    //         </View>
    //     );
    // }

    return (
      <View>
        <ShopHeader navigation={navigation} />
        <View style={styles.container}>
            <Text style={styles.title}>Manage Subscription</Text>
            {/* <Carousel
                data={flavours}
                renderItem={renderItem}
                sliderWidth={400}
                itemWidth={200}
            /> */}

            {subscription.type === 'monthly' && (
                <Button title="Upgrade to yearly" onPress={() => navigation.dispatch(StackActions.push(('UpgradeMembership')))} />
            )}
            
            <Button
              title="Cancel Membership"
              onPress={() => navigation.dispatch(StackActions.push('CancelMembership', { isSubscribed, setIsSubscribed }))}
            />
            
            <Button title="Change Credit Card Information" onPress={() => navigation.dispatch(StackActions.push('ChangeCreditCard'))} />
            
            <Button title="Change Address" onPress={() => navigation.dispatch(StackActions.push('ChangeAddress'))} />

            <Button title="Change Flavours" onPress={() => navigation.dispatch(StackActions.push('ChangeFlavours'))} />
        </View>
          <ShopFooter navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default ManageSubscription;