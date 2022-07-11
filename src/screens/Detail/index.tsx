import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { IC_BG_ITEM } from '../../assets';
import Button from '../../components/Button';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { SCREEN_MARGIN_HORIZONTAL } from '../../configs/App';

const DetailScreen = () => {
  const Size = [
    { id: '1', name: 'Small' },
    { id: '2', name: 'Medium' },
    { id: '3', name: 'Large' },
  ];
  const [selected, setSelected] = useState(Size[0].id);

  return (
    <View style={styles.container}>
      <Header canBack user />
      <SearchBar />
      <View style={styles.detailItem}>
        <View style={styles.backgroundItem}>
          <Image source={IC_BG_ITEM} style={styles.image} />
        </View>
        <View style={styles.inforItem}>
          <Text style={styles.title}>Cappuchino</Text>
          <View style={styles.content}>
            <Text style={styles.heading}>Coffee Size</Text>
            <View style={styles.menu}>
              {Size.map((sz, index) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    {
                      marginLeft: index === 0 ? 0 : 10,
                      backgroundColor:
                        sz.id === selected ? '#754C24' : '#F5F5F5',
                    },
                  ]}
                  key={sz.id}
                  onPress={() => setSelected(sz.id)}>
                  <View style={styles.menuItem}>
                    <Text
                      style={[
                        styles.text,
                        { color: sz.id === selected ? '#FFFFFF' : '#000000' },
                      ]}>
                      {sz.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.heading, { fontSize: 17 }]}>About</Text>
            <Text style={styles.description}>
              Cappuccino is a coffee-based drink made primarily from espresso
              and milk. It consists of one-third heated milk and one-third milk
              foam and is generally served in... Read more
            </Text>
            <Button style={styles.button} label={`Add to cart | $${6.99}`} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailItem: {
    flex: 1,
    position: 'relative',
  },
  inforItem: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  backgroundItem: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 16,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 330,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 10,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#754C24',
    borderRadius: 30,
    padding: 10,
    width: '30%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  description: {
    fontWeight: '500',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    lineHeight: 25,
    marginBottom: 8,
  },
  button: {
    marginTop: 10,
  },
});

export default DetailScreen;
