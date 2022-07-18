import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';

export const SCREEN_MARGIN_HORIZONTAL = 24;
export const HEADER_HEIGHT = 84;

export const DEFAULT_SHADOW_SETTINGS: ViewStyle = {
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.2,
  shadowRadius: 3.84,
};

export enum NAME_PAGES {
  Home = 'Home',
  Favorite = 'Favorite',
  Cart = 'Cart',
  Person = 'Person',
  Detail = 'Detail',
  Ordered = 'Ordered',
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  Introduce = 'Introduce',
  ForgotPassword = 'ForgotPassword',
  Selection = 'Selection',
}

export enum NAME_STACK {
  HomeStack = 'HomeStack',
  CartStack = 'CartStack',
}

export const DEFAULT_KEYBOARD_AWARE_SCROLL_VIEW_CONFIGS: KeyboardAwareScrollViewProps =
  {
    enableOnAndroid: true,
    extraScrollHeight: 80,
  };
