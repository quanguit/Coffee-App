import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { SCREEN_MARGIN_HORIZONTAL } from '../../../configs/App';
import { useTheme } from '../../../context/Theme';

type Props = {
  title: string;
  value: string;
  image: number;
};

const Input = ({ title, value, image }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={image} />
      </View>
      <View style={styles.content}>
        <Text style={{ fontSize: 12, color: colors.primaryText }}>{title}</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.primaryText,
          }}>
          {value}
        </Text>
      </View>
      <TouchableOpacity>
        <AntDesignIcon name="edit" size={25} color={colors.primaryText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 24,
  },
  content: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  image: {
    backgroundColor: '#F7F8FB',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
});

export default Input;
