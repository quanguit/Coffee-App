import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ThemeType } from './index.type';

type Props = {
  children?: ReactNode;
};

const LightTheme = {
  primaryBackground: '#FFFFFF',
  primaryText: '#333333',
  secondaryBackground: '#FFE5E5',
  secondaryText: '#FF6057',
  // labelText: '#666666',
  // primary: '#238CFD',
  // textOnColoredSurface: '#FFFFFF',
  // success: '#48C4A1',
  // successSurface: '#DAF3EC',
  // warning: '#F3A712',
  // danger: '#FF6057',
  // dangerSurface: '#FFDFDD',
  // disabled: 'rgba(0, 0, 0, 0.1)',
  // border: '#E5E5E5',
  // divider: '#EEEEEE',
  // tableHeaderBackground: '#F2F2F2',

  // // Components
  // codeInputBorder: '#C4C4C4',
  // vaccineInfoBodyBg: '#FCFCFC',
  // vaccineInfoBadgeBg: '#A0C4FF',
  // vaccineInfoBadgeText: 'rgba(0, 0, 0, 0.5)',
  // scanLogBgExpanded: 'rgba(0, 0, 0, 0.02)',
  // scanQRButtonLabel: '#519BE3',
  // viewScanLogButtonLabel: '#6166D7',
};

const DarkTheme = {
  primaryBackground: '#173a5d',
  primaryText: '#FFFFFF',
  secondaryBackground: '#FFFFFF',
  secondaryText: '#333333',
  // labelText: '#666666',
  // primary: '#238CFD',
  // textOnColoredSurface: '#FFFFFF',
  // success: '#48C4A1',
  // successSurface: '#DAF3EC',
  // warning: '#F3A712',
  // danger: '#FF6057',
  // dangerSurface: '#FFDFDD',
  // disabled: 'rgba(0, 0, 0, 0.1)',
  // border: '#E5E5E5',
  // divider: '#EEEEEE',
  // tableHeaderBackground: '#F2F2F2',

  // // Components
  // codeInputBorder: '#C4C4C4',
  // vaccineInfoBodyBg: '#FCFCFC',
  // vaccineInfoBadgeBg: '#A0C4FF',
  // vaccineInfoBadgeText: 'rgba(0, 0, 0, 0.5)',
  // scanLogBgExpanded: 'rgba(0, 0, 0, 0.02)',
  // scanQRButtonLabel: '#519BE3',
  // viewScanLogButtonLabel: '#6166D7',
};

const themeDefault = {
  isDark: false,
  colors: LightTheme,
  changeTheme: () => {},
};

const ThemeContext = createContext<ThemeType>(themeDefault);

const ThemeProvider = ({ children }: Props) => {
  const [isDark, setIsisDark] = useState(false);

  const changeTheme = () => setIsisDark(!isDark);

  const themeContextData = {
    isDark,
    colors: isDark ? DarkTheme : LightTheme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextData}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
