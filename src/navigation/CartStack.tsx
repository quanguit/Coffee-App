import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/Cart';
import OrderedScreen from '../screens/Cart/OrderedScreen';
import { DefaultScreenOptions } from '../configs/Navigation';
import { CART } from './AuthorizedTab';

const { Navigator, Screen } = createNativeStackNavigator();

const CartStack = () => (
  <Navigator screenOptions={DefaultScreenOptions}>
    <Screen name={CART} component={CartScreen} />
    <Screen name={ORDERED} component={OrderedScreen} />
  </Navigator>
);

export const ORDERED = 'ORDERED';
export const CART_STACK = 'CART_STACK';

export default CartStack;
