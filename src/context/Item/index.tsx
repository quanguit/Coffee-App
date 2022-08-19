import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ItemProps, ItemType } from './index.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  children?: ReactNode;
};

const itemDefault = {
  items: [],
  setItems: () => {},
  addItem: () => {},
  removeItem: () => {},
  deleteAllItems: () => {},
};

export const ItemContext = createContext<ItemType>(itemDefault);

const ItemsProvider = ({ children }: Props) => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const ref = useRef(false);

  useEffect(() => {
    const storedAsyncStorage = async () => {
      try {
        await AsyncStorage.setItem('Items', JSON.stringify(items));
      } catch (error) {
        console.log('error: ', error);
      }
    };

    // set rule for useEffect() in Context render after useEffect() in App
    if (ref.current === false) {
      ref.current = true;
    } else {
      storedAsyncStorage();
    }
  }, [items]);

  const addItem = (item: ItemProps) => {
    const existingItem = items.find(
      it => it.id === item.id && it.size === item.size,
    );

    if (existingItem) {
      let newArray = items.map(it =>
        it.id === item.id && it.size === item.size
          ? { ...it, quantity: it.quantity + 1 }
          : it,
      );
      setItems(newArray);
      return;
    }

    let newArray = [...items, { ...item }];
    setItems(newArray);
  };

  const removeItem = (id: string, size: string) => {
    const existingItem = items.find(
      item => item.id === id && item.size === size,
    );

    if (existingItem?.quantity === 1) {
      let newArray = items.filter(item =>
        item.id !== id ? item.id !== id : item.size !== size,
      );
      setItems(newArray);
      return;
    }

    let newArray = items.map(item =>
      item.id === id && item.size === size
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    setItems(newArray);
  };

  const deleteAllItems = async () => {
    await AsyncStorage.removeItem('Items');
    setItems([]);
  };

  const itemContextData = {
    items,
    setItems,
    addItem,
    removeItem,
    deleteAllItems,
  };

  return (
    <ItemContext.Provider value={itemContextData}>
      {children}
    </ItemContext.Provider>
  );
};
export default ItemsProvider;
