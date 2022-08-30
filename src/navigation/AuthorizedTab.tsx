import React from 'react';
import { NAME_PAGES } from '../configs/App';
import PersonScreen from '../screens/Person';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack, { DETAIL, HOME_STACK } from './HomeStack';
import CartStack, { CART_STACK, ORDERED } from './CartStack';
import FavoriteStack, { FAVORITE_STACK } from './FavoriteStack';

const { Navigator, Screen } = createBottomTabNavigator();

const AuthorizedTab = () => {
  return (
    <Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#D6D4D4',
      }}>
      <Screen
        name={HOME_STACK}
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="home" color={color} size={30} />
          ),
          tabBarLabel: `${NAME_PAGES.Home}`,
        }}
      />
      <Screen
        name={FAVORITE_STACK}
        component={FavoriteStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="heart" color={color} size={30} />
          ),
          tabBarLabel: `${NAME_PAGES.Favorite}`,
        }}
      />
      <Screen
        name={CART_STACK}
        component={CartStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="shopping-cart" color={color} size={30} />
          ),
          tabBarLabel: `${NAME_PAGES.Cart}`,
        }}
      />
      <Screen
        name={PERSON}
        component={PersonScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="account" color={color} size={30} />
          ),
          tabBarLabel: `${NAME_PAGES.Person}`,
        }}
      />
    </Navigator>
  );
};

export const HOME = 'HOME';
export const FAVORITE = 'FAVORITE';
export const CART = 'CART';
export const PERSON = 'PERSON';
export const AUTHORIZED_TAB = 'AUTHORIZED_TAB';

export type AuthorizedTabParamList = {
  [HOME]: undefined;
  [FAVORITE]: undefined;
  [CART]: undefined;
  [PERSON]: undefined;
};

export type HomeStackParamList = {
  [DETAIL]: { itemId: string };
};

export type CartStackParamList = {
  [ORDERED]: undefined;
};

export default AuthorizedTab;
