import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { SCREEN_MARGIN_HORIZONTAL } from '../../configs/App';
import { HomeStackParamList } from '../../navigation/AuthorizedTab';
import firestore from '@react-native-firebase/firestore';
import { ItemProps } from '../Home/types';
import { useTheme } from '../../context/Theme';

const DetailScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList>>();
  const { itemId } = route.params;
  const { colors } = useTheme();
  const [item, setItem] = useState<ItemProps | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [price, setPrice] = useState(0);

  const getDetailItem = async () => {
    const getItem = await firestore()
      .collection('collection')
      .where('id', '==', itemId)
      .get();
    const convertDataToDocs = getItem.docs;
    const convertDataToArray = convertDataToDocs.map(
      it => it.data() as ItemProps,
    );
    setItem(convertDataToArray[0]);
    setSelectedSize(convertDataToArray[0].sizes[0].size);
    setPrice(convertDataToArray[0].sizes[0].price);
  };

  useEffect(() => {
    getDetailItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkFullSize = () => {
    if (item?.sizes.length === 3) {
      return true;
    }
    return false;
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header canBack user />
      <SearchBar />
      <View style={styles.detailItem}>
        <View style={styles.backgroundItem}>
          <Image source={{ uri: item?.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.inforItem}>
          <Text style={styles.title}>{item?.name}</Text>
          <View style={styles.content}>
            <Text style={styles.heading}>Size</Text>
            <View
              style={[
                styles.menu,
                {
                  justifyContent: checkFullSize()
                    ? 'space-between'
                    : 'space-evenly',
                },
              ]}>
              {item?.sizes.map(sz => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    {
                      backgroundColor:
                        sz.size === selectedSize ? '#754C24' : '#F5F5F5',
                    },
                  ]}
                  key={sz.size}
                  onPress={() => {
                    setSelectedSize(sz.size);
                    setPrice(sz.price);
                  }}>
                  <View style={styles.menuItem}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color:
                            sz.size === selectedSize ? '#FFFFFF' : '#000000',
                        },
                      ]}>
                      {sz.size}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              wrapperStyle={styles.btn}
              style={styles.styleBtn}
              label={`Add to cart   |   $${price}`}
              borderColor="#754C24"
              backgroundColor="#754C24"
            />
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
    fontSize: 30,
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 8,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 350,
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 180,
    position: 'relative',
  },
  menu: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 10,
    marginTop: 20,
  },
  item: {
    width: '30%',
    backgroundColor: '#754C24',
    borderRadius: 30,
    padding: 10,
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
  btn: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
  },
  styleBtn: {
    width: 280,
  },
});

export default DetailScreen;
