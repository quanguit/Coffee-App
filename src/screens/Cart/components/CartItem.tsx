import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DEFAULT_SHADOW_SETTINGS } from '../../../configs/App';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useTheme } from '../../../context/Theme';
import { useItem } from '../../../context/Item';

type Props = {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
};

const typeSize = [
  { label: 'S', value: 'Small' },
  { label: 'M', value: 'Medium' },
  { label: 'L', value: 'Large' },
];

const CartItem = ({ id, title, image, price, quantity, size }: Props) => {
  const { isDark } = useTheme();
  const { removeItem } = useItem();

  const convertSize = (sizee: string) => {
    let temp = typeSize.find(obj => obj.value === sizee);
    return temp?.label;
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.title, { marginVertical: 5 }]}>
            Size: {convertSize(size)}
          </Text>
          <Text style={styles.title}>x {quantity}</Text>
        </View>
        <Text style={styles.price}>${price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeItem(id, size)}
        style={[
          styles.icon,
          { backgroundColor: isDark ? '#FFFFFF' : '#FFE5E5' },
        ]}>
        <SimpleLineIcons
          name="trash"
          color={isDark ? '#333333' : '#FF6057'}
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    ...DEFAULT_SHADOW_SETTINGS,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    position: 'relative',
    backgroundColor: '#F7F8FB',
    width: 300,
    height: 100,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 110,
    height: 80,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    color: '#333333',
  },
  content: {
    marginLeft: 10,
  },
  price: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 10,
    marginRight: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  icon: {
    width: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 20,
  },
});

export default CartItem;
