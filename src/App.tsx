import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import AuthorizedStack, {
  AUTHORIZED_STACK,
} from './navigation/AuthorizedStack';
import UnauthorizedStack, {
  UNAUTHORIZED_STACK,
} from './navigation/UnauthorizedStack';
import { DefaultScreenOptions } from './configs/Navigation';

const App = () => {
  const accessToken = true;

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

export default App;
