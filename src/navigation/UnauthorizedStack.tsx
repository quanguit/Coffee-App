import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import IntroduceScreen from '../screens/Introduce';
import SelectionScreen from '../screens/Introduce/SelectionScreen';
import { DefaultScreenOptions } from '../configs/Navigation';

const { Navigator, Screen } = createNativeStackNavigator();

const UnauthorizedStack = () => (
  <Navigator screenOptions={DefaultScreenOptions}>
    <Screen name={INTRODUCE} component={IntroduceScreen} />
    <Screen name={SELECTION} component={SelectionScreen} />
    <Screen name={SIGN_IN} component={SignInScreen} />
    <Screen name={SIGN_UP} component={SignUpScreen} />
    <Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} />
  </Navigator>
);

export const INTRODUCE = 'INTRODUCE';
export const SELECTION = 'SELECTION';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const UNAUTHORIZED_STACK = 'UNAUTHORIZED_STACK';

export type UnauthorizedStackParamList = {
  [INTRODUCE]: undefined;
  [SELECTION]: undefined;
  [SIGN_IN]: undefined;
  [SIGN_UP]: undefined;
  [FORGOT_PASSWORD]: undefined;
};

export default UnauthorizedStack;
