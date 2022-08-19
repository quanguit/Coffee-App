import { useContext } from 'react';
import { AppContext } from './App';
import { ItemContext } from './Item';
import { ThemeContext } from './Theme';
import { AuthContext } from './Auth/index';

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useItem = () => {
  return useContext(ItemContext);
};

export const useApp = () => {
  return useContext(AppContext);
};

export const useAuth = () => {
  return useContext(AuthContext);
};
