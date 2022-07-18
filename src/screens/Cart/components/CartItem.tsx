import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DEFAULT_SHADOW_SETTINGS } from '../../../configs/App';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type Props = {
  title: string;
  image: number;
  price: number;
  quantity: number;
};

const CartItem = ({ title, image, price, quantity }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={image} style={styles.image} />
        <View style={styles.content}>
          <Text style={[styles.title, { marginBottom: 5 }]}>{title}</Text>
          <Text style={styles.title}>x {quantity}</Text>
        </View>
        <Text style={styles.price}>${price}</Text>
      </View>
      <TouchableOpacity style={styles.icon}>
        <SimpleLineIcons name="trash" color="red" size={25} />
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
    backgroundColor: '#FFE5E5',
    width: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 20,
  },
});

export default CartItem;
