import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { LanguageType } from './index.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n';

type Props = {
  children: ReactNode;
};

const languageDefault = {
  language: 'en',
  setLanguage: () => {},
  changeLanguage: () => {},
};

export const LanguageContext = createContext<LanguageType>(languageDefault);

const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState('en');
  const ref = useRef(false);

  useEffect(() => {
    const storedAsyncStorage = async () => {
      try {
        await AsyncStorage.setItem('Language', JSON.stringify(language));
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
  }, [language]);

  const changeLanguage = (lang: string) => {
    if (lang === 'en') {
      setLanguage('vi');
      i18n.changeLanguage('vi');
    } else {
      setLanguage('en');
      i18n.changeLanguage('en');
    }
  };

  const languageContextData = {
    language,
    setLanguage,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={languageContextData}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
