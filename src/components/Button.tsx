import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';
import {
  DEFAULT_SHADOW_SETTINGS,
  SCREEN_MARGIN_HORIZONTAL,
} from '../configs/App';

type Props = {
  onPress?: () => void | null | Promise<void> | Promise<null>;
  style?: StyleProp<ViewStyle>;
  label?: string;
  icon?: number;
};

const Button = ({ icon, label, onPress, style }: Props) => {
  return (
    <ShadowView style={[styles.wrapper, style]}>
      <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
        {icon && <Image source={icon} style={styles.icon} />}
        {label && <Text style={styles.label}>{label}</Text>}
      </TouchableOpacity>
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...DEFAULT_SHADOW_SETTINGS,
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    backgroundColor: '#754C24',
    flexDirection: 'row',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#754C24',
    width: '80%',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  label: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default Button;
