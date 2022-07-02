import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import HomeScreen from './screens/Home';
import FavoriteScreen from './screens/Favorite';
import CartScreen from './screens/Cart';
import PersonScreen from './screens/Person';
import VectorImage from 'react-native-vector-image';
import { IC_HOME, IC_CART, IC_FAVORITE, IC_PERSON } from './images/index';

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#D6D4D4',
        }}>
        <AppStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({}) => <VectorImage source={IC_HOME} />,
            tabBarLabel: 'Home',
          }}
        />
        <AppStack.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            tabBarIcon: ({}) => <VectorImage source={IC_FAVORITE} />,
            tabBarLabel: 'Favorite',
          }}
        />
        <AppStack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({}) => <VectorImage source={IC_CART} />,
            tabBarLabel: 'Cart',
          }}
        />
        <AppStack.Screen
          name="Person"
          component={PersonScreen}
          options={{
            tabBarIcon: ({}) => <VectorImage source={IC_PERSON} />,
            tabBarLabel: 'Person',
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8EAED',
//   },
// });

export default App;
