import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  name: string;
};

const Person: React.FC<Props> = () => {
  return (
    <View>
      <Text>Person</Text>
    </View>
  );
};

export default Person;
