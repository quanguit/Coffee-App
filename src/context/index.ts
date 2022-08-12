import { useContext } from 'react';
import { AppContext } from './App';
import { ItemContext } from './Item';
import { ThemeContext } from './Theme';

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useItem = () => {
  return useContext(ItemContext);
};

export const useApp = () => {
  return useContext(AppContext);
};
