import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  name: string;
};

const Home: React.FC<Props> = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
