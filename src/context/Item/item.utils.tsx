import { ItemProps } from './index.type';

export const addItem = (items: ItemProps[], itemToAdd: ItemProps) => {
  const existingItem = items.find(it => it.id === itemToAdd.id);

  if (existingItem) {
    let newArray = items.map(item =>
      item.id === itemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    return newArray;
  }
  let newArray = [...items, { ...itemToAdd }];
  return newArray;
};

export const removeItem = (items: ItemProps[], id: string) => {
  const existingItem = items.find(item => item.id === id);

  if (existingItem?.quantity === 1) {
    const newArray = items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity || 1 - 1 } : item,
    );
    return newArray;
  }
  const newArray = items.filter(item => item.id === id);
  return newArray;
};

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
