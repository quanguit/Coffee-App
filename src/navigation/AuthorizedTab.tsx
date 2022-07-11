import React from 'react';
import { NAME_PAGES, NAME_STACK } from '../configs/App';
import CartScreen from '../screens/Cart';
import FavoriteScreen from '../screens/Favorite';
import PersonScreen from '../screens/Person';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './HomeStack';

const { Navigator, Screen } = createBottomTabNavigator();

const AuthorizedTab = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#D6D4D4',
      }}>
      <Screen
        name={NAME_STACK.HomeStack}
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="home" color={color} size={30} />
          ),
          tabBarLabel: `${NAME_PAGES.Home}`,
        }}
      />
      <Screen
        name={NAME_PAGES.Favorite}
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="heart" color={color} size={30} />
          ),
          tabBarLabel: `${NAME_PAGES.Favorite}`,
        }}
      />
      <Screen
        name={NAME_PAGES.Cart}
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="shopping-cart" color={color} size={30} />
          ),
          tabBarLabel: `${NAME_PAGES.Cart}`,
        }}
      />
      <Screen
        name={NAME_PAGES.Person}
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

export const AUTHORIZED_TAB = 'AUTHORIZED_TAB';

export type AuthorizedTabParamList = {
  [NAME_PAGES.Home]: undefined;
  [NAME_PAGES.Favorite]: undefined;
  [NAME_PAGES.Cart]: undefined;
  [NAME_PAGES.Person]: undefined;
};

export type HomeStackParamList = {
  [NAME_PAGES.Detail]: undefined;
};

export default AuthorizedTab;
