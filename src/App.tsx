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

const { Navigator, Screen } = AppStack;

const App = () => {
  const accessToken = true;

  const renderAppStackScreens = () => {
    if (accessToken) {
      return <Screen name={AUTHORIZED_STACK} component={AuthorizedStack} />;
    }
    return <Screen name={UNAUTHORIZED_STACK} component={UnauthorizedStack} />;
  };

  return (
    <NavigationContainer>
      <Navigator screenOptions={DefaultScreenOptions}>
        {renderAppStackScreens()}
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
