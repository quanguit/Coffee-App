import React, { createContext, ReactNode, useContext, useState } from 'react';
import { AppType } from './index.types';

type Props = {
  children?: ReactNode;
};

const appDefault = {
  appLoading: false,
  setAppLoading: () => {},
  showAppLoading: () => {},
  hideAppLoading: () => {},
};

const AppContext = createContext<AppType>(appDefault);

const AppProvider = ({ children }: Props) => {
  const [appLoading, setAppLoading] = useState(false);

  const showAppLoading = () => {};
  const hideAppLoading = () => {};

  const itemContextData = {
    appLoading,
    setAppLoading,
    showAppLoading,
    hideAppLoading,
  };
  return (
    <AppContext.Provider value={itemContextData}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useApp = () => {
  return useContext(AppContext);
};
