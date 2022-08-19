export type ItemOptionProps = {
  cate_id: string;
  id: string;
  imageUrl: string;
  name: string;
  sizes: SizesProp[];
};

export type ItemProps = {
  cate_id: string;
  id: string;
  imageUrl: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
};

type SizesProp = {
  price: number;
  size: string;
};

export type ItemType = {
  items: ItemProps[];
  setItems: (arrayItem: ItemProps[]) => void;
  addItem: (item: ItemProps) => void;
  removeItem: (id: string, size: string) => void;
  deleteAllItems: () => void;
};
