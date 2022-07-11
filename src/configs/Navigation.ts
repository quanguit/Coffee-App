import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  AuthorizedTabParamList,
  HomeStackParamList,
} from '../navigation/AuthorizedTab';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// if only using one AuthorizedTabParamList or HomeStackParamList
// const navigation =
//   useNavigation<BottomTabNavigationProp<AuthorizedTabParamList>>();

// include 2 ParamList
export type AllScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthorizedTabParamList>,
  StackNavigationProp<HomeStackParamList>
>;

export const DefaultScreenOptions: NativeStackNavigationOptions = {
  header: () => null,
};
