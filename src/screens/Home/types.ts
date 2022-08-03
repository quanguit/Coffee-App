export type ItemProps = {
  cate_id: string;
  id: string;
  imageUrl: string;
  name: string;
  sizes: SizesProp[];
};

type SizesProp = {
  price: number;
  size: string;
};
