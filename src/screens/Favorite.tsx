import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  name: string;
};

const Favorite: React.FC<Props> = () => {
  return (
    <View>
      <Text>Favorite</Text>
    </View>
  );
};

export default Favorite;
