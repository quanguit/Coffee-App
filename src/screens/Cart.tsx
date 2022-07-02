import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  name: string;
};

const Cart: React.FC<Props> = () => {
  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
};

export default Cart;
