import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import AuthorizedStack, {
  AUTHORIZED_STACK,
} from './navigation/AuthorizedStack';
import UnauthorizedStack, {
  UNAUTHORIZED_STACK,
} from './navigation/UnauthorizedStack';
import { DefaultScreenOptions } from './configs/Navigation';
import ThemeProvider, { useTheme } from './context/Theme';
import ItemsProvider, { useItem } from './context/Item';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppChild = () => {
  const { setIsDark } = useTheme();
  const { setItems } = useItem();
  const accessToken = true;

  useEffect(() => {
    const getAsyncStorage = async () => {
      try {
        const jsonTheme = await AsyncStorage.getItem('isDarkTheme');
        const jsonItems = await AsyncStorage.getItem('Items');
        if (jsonTheme) {
          setIsDark(JSON.parse(jsonTheme));
        }
        if (jsonItems) {
          setItems(JSON.parse(jsonItems));
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getAsyncStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAppStackScreens = () => {
    if (accessToken) {
      return (
        <AppStack.Screen name={AUTHORIZED_STACK} component={AuthorizedStack} />
      );
    }

    return (
      <AppStack.Screen
        name={UNAUTHORIZED_STACK}
        component={UnauthorizedStack}
      />
    );
  };

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={DefaultScreenOptions}>
        {renderAppStackScreens()}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ItemsProvider>
        <AppChild />
      </ItemsProvider>
    </ThemeProvider>
  );
};

export default App;
