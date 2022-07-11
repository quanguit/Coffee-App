import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAME_PAGES } from '../configs/App';
import HomeScreen from '../screens/Home';
import DetailScreen from '../screens/Detail';
import { DefaultScreenOptions } from '../configs/Navigation';

const { Navigator, Screen } = createNativeStackNavigator();

export const HomeStack = () => (
  <Navigator screenOptions={DefaultScreenOptions}>
    <Screen name={NAME_PAGES.Home} component={HomeScreen} />
    <Screen name={NAME_PAGES.Detail} component={DetailScreen} />
  </Navigator>
);
