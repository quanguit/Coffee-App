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
import ThemeProvider from './context/Theme';
import ItemsProvider from './context/Item';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useItem, useLanguage, useTheme } from './context';
import AppProvider from './context/App';
import AppLoading from './components/AppLoading';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import LanguageProvider from './context/Language';
import i18n from './i18n';

const AppChild = () => {
  const { setIsDark } = useTheme();
  const { setItems } = useItem();
  const { setLanguage } = useLanguage();
  const accessToken = true;

  useEffect(() => {
    const getAsyncStorage = async () => {
      try {
        const jsonTheme = await AsyncStorage.getItem('isDarkTheme');
        const jsonItems = await AsyncStorage.getItem('Items');
        const jsonLanguage = await AsyncStorage.getItem('Language');

        if (jsonTheme) {
          setIsDark(JSON.parse(jsonTheme));
        }
        if (jsonItems) {
          setItems(JSON.parse(jsonItems));
        }
        if (jsonLanguage) {
          setLanguage(JSON.parse(jsonLanguage));
          i18n.changeLanguage(JSON.parse(jsonLanguage));
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getAsyncStorage();
    SplashScreen.hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAppStackScreens = () => {
    if (accessToken) {
      return (
        <AppStack.Screen
          name={AUTHORIZED_STACK}
          component={AuthorizedStack || null}
        />
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
    <>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={DefaultScreenOptions}>
          {renderAppStackScreens()}
        </AppStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ItemsProvider>
            <AppChild />
            <Toast />
            <AppLoading />
          </ItemsProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
