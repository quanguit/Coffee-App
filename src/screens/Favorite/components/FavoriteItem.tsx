import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';
import { DEFAULT_SHADOW_SETTINGS } from '../../../configs/App';
import { AuthorizedNavigationProp } from '../../../configs/Navigation';
import { DETAIL } from '../../../navigation/HomeStack';

type Props = {
  id?: string;
  title?: string;
  image?: string;
};

const FavoriteItem = ({ id, title, image }: Props) => {
  const navigation = useNavigation<AuthorizedNavigationProp>();

  return (
    <ShadowView style={styles.shadow}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate(DETAIL, { itemId: id || '' })}>
        <Image source={{ uri: image }} style={styles.image} />
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
    backgroundColor: '#FFFFFF',
    width: 160,
    height: 180,
    borderRadius: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    marginBottom: 10,
    width: 110,
    height: 110,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    alignItems: 'center',
  },
});

export default FavoriteItem;
