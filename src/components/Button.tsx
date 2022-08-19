import React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';
import { DEFAULT_SHADOW_SETTINGS } from '../configs/App';

type Props = {
  onPress?: () => void | null | Promise<void> | Promise<null>;
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: ViewStyle;
  label?: string;
  icon?: React.ReactNode;
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  fontSize?: number;
  textColor?: ColorValue;
};

const Button = ({
  icon,
  label,
  onPress,
  style,
  backgroundColor,
  borderColor,
  wrapperStyle,
  fontSize = 18,
  textColor = '#FFFFFF',
}: Props) => {
  return (
    <ShadowView style={[styles.wrapper, wrapperStyle]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.itemContainer, { backgroundColor, borderColor }, style]}>
        {icon && <View>{icon}</View>}
        {label && (
          <Text
            style={[styles.label, { fontSize: fontSize, color: textColor }]}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...DEFAULT_SHADOW_SETTINGS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
  },
  label: {
    fontWeight: '500',
  },
});

export default Button;
