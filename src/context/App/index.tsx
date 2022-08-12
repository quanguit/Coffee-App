import React, { createContext, ReactNode, useState } from 'react';
import { AppType } from './index.types';

type Props = {
  children?: ReactNode;
};

const appDefault = {
  appLoading: false,
  showAppLoading: () => {},
  hideAppLoading: () => {},
};

export const AppContext = createContext<AppType>(appDefault);

const AppProvider = ({ children }: Props) => {
  const [appLoading, setAppLoading] = useState(false);

  const showAppLoading = () => setAppLoading(true);
  const hideAppLoading = () => setAppLoading(false);

  const appContextData = {
    appLoading,
    showAppLoading,
    hideAppLoading,
  };

  return (
    <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
