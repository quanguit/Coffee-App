import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/Detail';
import { DefaultScreenOptions } from '../configs/Navigation';
import { FAVORITE } from './AuthorizedTab';
import FavoriteScreen from '../screens/Favorite';

const { Navigator, Screen } = createNativeStackNavigator();

const FavoriteStack = () => (
  <Navigator screenOptions={DefaultScreenOptions}>
    <Screen name={FAVORITE} component={FavoriteScreen} />
    <Screen name={DETAIL} component={DetailScreen} />
  </Navigator>
);

export const DETAIL = 'DETAIL';
export const FAVORITE_STACK = 'FAVORITE_STACK';

export default FavoriteStack;
