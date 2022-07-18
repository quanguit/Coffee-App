import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';
import { DEFAULT_SHADOW_SETTINGS } from '../../../configs/App';

type Props = {
  title: string;
  image: number;
};

const FavoriteItem = ({ title, image }: Props) => {
  return (
    <ShadowView style={styles.shadow}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => console.log('click!')}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    ...DEFAULT_SHADOW_SETTINGS,
  },
  item: {
    backgroundColor: 'white',
    width: 160,
    height: 180,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    marginBottom: 20,
    width: 110,
    height: 80,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    alignItems: 'center',
  },
});

export default FavoriteItem;
