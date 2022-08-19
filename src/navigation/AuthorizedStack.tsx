import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthorizedTab, { AUTHORIZED_TAB } from './AuthorizedTab';
import { DefaultScreenOptions } from '../configs/Navigation';

const { Navigator, Screen } = createNativeStackNavigator();

const AuthorizedStack = () => (
  <Navigator screenOptions={DefaultScreenOptions}>
    <Screen name={AUTHORIZED_TAB} component={AuthorizedTab} />
  </Navigator>
);

export const AUTHORIZED_STACK = 'AUTHORIZED_STACK';

export type AuthorizedStackParamList = {
  [AUTHORIZED_TAB]: undefined;
};

export default AuthorizedStack;
