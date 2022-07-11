import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  name: string;
};

const PersonScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>PersonScreen</Text>
    </View>
  );
};

export default PersonScreen;
