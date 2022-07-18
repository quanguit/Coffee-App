import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IMAGE_ITEM_FAVOR } from '../../assets';
import Header from '../../components/Header';
import { SCREEN_MARGIN_HORIZONTAL } from '../../configs/App';
import FavoriteItem from './components/FavoriteItem';

const FavoriteScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState([
    { id: '0', title: 'Americano', image: IMAGE_ITEM_FAVOR },
    { id: '1', title: 'Americano', image: IMAGE_ITEM_FAVOR },
    { id: '2', title: 'Americano', image: IMAGE_ITEM_FAVOR },
    { id: '3', title: 'Americano', image: IMAGE_ITEM_FAVOR },
    { id: '4', title: 'Americano', image: IMAGE_ITEM_FAVOR },
  ]);

  return (
    <View style={styles.container}>
      <Header user canBack />
      <Text style={styles.heading}>Favorites</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.section}>
        <Text style={styles.content}>Select your coffee</Text>
        <View style={styles.favorItems}>
          {data.map(item => (
            <FavoriteItem key={item.id} title={item.title} image={item.image} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 10,
    marginTop: 20,
    color: '#D8D8D8',
  },
  section: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1C140F',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  favorItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
});

export default FavoriteScreen;
