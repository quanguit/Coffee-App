import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps,
  ViewStyle,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { IC_INVISIBILITY, IC_VISIBILITY } from '../assets';
import { SCREEN_MARGIN_HORIZONTAL } from '../configs/App';

type Props = {
  label?: string;
  error?: string;
  optional?: boolean;
  explanation?: string;
  containerStyle?: ViewStyle;
  icon?: number;
} & TextInputProps;

const ICON_WIDTH = 70;
const INPUT_MAX_WIDTH = 50;

const TextInput = ({ error, icon, ...textInputProps }: Props) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const visibleVisibilityIcon =
    typeof textInputProps.secureTextEntry === 'boolean'; // set visibleVisibilityIcon to other data type // undefined -> boolean
  const [hiddenText, setHiddenText] = useState(
    !!textInputProps.secureTextEntry,
  );

  const toggleVisibility = () => {
    setHiddenText(!hiddenText);
  };

  return (
    <View
      style={styles.container}
      onLayout={event => setContainerWidth(event.nativeEvent.layout.width)}>
      <View
        style={[
          styles.textInputContainer,
          {
            borderBottomColor:
              error && textInputProps.value ? 'red' : '#C1C7D0',
          },
        ]}>
        <View style={styles.image}>
          <Image source={icon} style={styles.icon} />
        </View>
        <RNTextInput
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          blurOnSubmit={false}
          style={[
            styles.textInput,
            {
              maxWidth:
                containerWidth -
                (visibleVisibilityIcon ? ICON_WIDTH : INPUT_MAX_WIDTH),
            },
          ]}
          {...textInputProps}
          secureTextEntry={hiddenText}
        />
        {visibleVisibilityIcon && (
          <TouchableOpacity
            onPress={toggleVisibility}
            style={styles.toggleVisibilityButton}>
            <Image
              source={hiddenText ? IC_INVISIBILITY : IC_VISIBILITY}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {!!error && (
        <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 32,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  image: {
    borderRightColor: '#C1C7D0',
    borderRightWidth: 1,
    paddingHorizontal: 8,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    flexGrow: 1,
    marginLeft: 16,
  },
  toggleVisibilityButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  errorText: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default TextInput;
