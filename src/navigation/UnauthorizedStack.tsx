import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import ForgotPasswordScreen from '../screens/ForgotPassword';

const { Navigator, Screen } = createNativeStackNavigator();

const UnauthorizedStack = () => (
  <Navigator>
    <Screen name={SIGN_IN} component={SignInScreen} />
    <Screen name={SIGN_UP} component={SignUpScreen} />
    <Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} />
  </Navigator>
);

const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';
const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const UNAUTHORIZED_STACK = 'UNAUTHORIZED_STACK';

export type UnauthorizedStackParamList = {
  [SIGN_IN]: undefined;
  [SIGN_UP]: undefined;
  [FORGOT_PASSWORD]: undefined;
};

export default UnauthorizedStack;
