import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';

type Props = {
  label?: string;
  error?: string;
  optional?: boolean;
  explanation?: string;
  containerStyle?: ViewStyle;
} & TextInputProps;

const TextInput = ({ label, error, optional }: Props) => {
  return (
    <View>
      <RNTextInput />
    </View>
  );
};

export default TextInput;
