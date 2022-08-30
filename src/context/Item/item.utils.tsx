import { FavoriteItem } from '../../screens/Detail';
import { ItemProps } from './index.type';

export const totalPrice = (items: ItemProps[]) => {
  return items.reduce(
    (prevVal, currentVal) =>
      Number((currentVal.quantity * currentVal.price + prevVal).toFixed(2)),
    0,
  );
};

export const totalQuantity = (items: ItemProps[]) => {
  return items.reduce(
    (prevVal, currentVal) => currentVal.quantity + prevVal,
    0,
  );
};

export const addItemToCartFavorite = (
  favoriteList: FavoriteItem[],
  item: FavoriteItem,
) => {
  const existingCartItem = favoriteList.find(_item => _item.id === item.id);

  if (existingCartItem) {
    favoriteList = favoriteList.filter(_item => _item.id !== item.id);
  } else {
    favoriteList.push(item);
  }

  return favoriteList;
};
