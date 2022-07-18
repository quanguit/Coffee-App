import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import DetailScreen from '../screens/Detail';
import { DefaultScreenOptions } from '../configs/Navigation';
import { HOME } from './AuthorizedTab';

const { Navigator, Screen } = createNativeStackNavigator();

const HomeStack = () => (
  <Navigator screenOptions={DefaultScreenOptions}>
    <Screen name={HOME} component={HomeScreen} />
    <Screen name={DETAIL} component={DetailScreen} />
  </Navigator>
);

export const DETAIL = 'DETAIL';
export const HOME_STACK = 'HOME_STACK';

export default HomeStack;
