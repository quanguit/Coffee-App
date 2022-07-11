import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  name: string;
};

const CartScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  );
};

export default CartScreen;
