import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ThemeType } from './index.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  children?: ReactNode;
};

const LightTheme = {
  primaryBackground: '#FFFFFF',
  primaryText: '#333333',
  secondaryBackground: '#FFE5E5',
  secondaryText: '#FF6057',
  backgroundColorSpinner: '#FFFFFF',
  textOnColoredSurface: '#333333',
  // labelText: '#666666',
  // primary: '#238CFD',
  // success: '#48C4A1',
  // successSurface: '#DAF3EC',
  // warning: '#F3A712',
  // danger: '#FF6057',
  // dangerSurface: '#FFDFDD',
  // disabled: 'rgba(0, 0, 0, 0.1)',
  // border: '#E5E5E5',
  // divider: '#EEEEEE',
  // tableHeaderBackground: '#F2F2F2',
};

const DarkTheme = {
  primaryBackground: '#173a5d',
  primaryText: '#FFFFFF',
  secondaryBackground: '#FFFFFF',
  secondaryText: '#333333',
  backgroundColorSpinner: '#333333',
  textOnColoredSurface: '#FFFFFF',
  // labelText: '#666666',
  // primary: '#238CFD',
  // success: '#48C4A1',
  // successSurface: '#DAF3EC',
  // warning: '#F3A712',
  // danger: '#FF6057',
  // dangerSurface: '#FFDFDD',
  // disabled: 'rgba(0, 0, 0, 0.1)',
  // border: '#E5E5E5',
  // divider: '#EEEEEE',
  // tableHeaderBackground: '#F2F2F2',
};

const themeDefault = {
  isDark: false,
  setIsDark: () => {},
  colors: LightTheme,
  changeTheme: () => {},
};

export const ThemeContext = createContext<ThemeType>(themeDefault);

const ThemeProvider = ({ children }: Props) => {
  const [isDark, setIsDark] = useState(false);
  const ref = useRef(false);

  useEffect(() => {
    const storedAsyncStorage = async () => {
      try {
        await AsyncStorage.setItem('isDarkTheme', JSON.stringify(isDark));
      } catch (error) {
        console.log('error: ', error);
      }
    };

    // set rule for useEffect() in Context render after useEffect() in App
    if (!ref.current) {
      ref.current = true;
    } else {
      storedAsyncStorage();
    }
  }, [isDark]);

  const changeTheme = () => setIsDark(!isDark);

  const themeContextData = {
    isDark,
    setIsDark,
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
