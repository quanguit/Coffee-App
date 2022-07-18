import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  AuthorizedTabParamList,
  CartStackParamList,
  HomeStackParamList,
} from '../navigation/AuthorizedTab';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// if only using one AuthorizedTabParamList or HomeStackParamList
// const navigation =
//   useNavigation<BottomTabNavigationProp<AuthorizedTabParamList>>();

// include 2 ParamList
export type AuthorizedNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthorizedTabParamList>,
  CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList>,
    StackNavigationProp<CartStackParamList>
  >
>;

export const DefaultScreenOptions: NativeStackNavigationOptions = {
  header: () => null,
  animation: 'slide_from_right',
};
