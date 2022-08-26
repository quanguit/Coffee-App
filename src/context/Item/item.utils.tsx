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
