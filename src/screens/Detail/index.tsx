import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { SCREEN_MARGIN_HORIZONTAL } from '../../configs/App';
import { HomeStackParamList } from '../../navigation/AuthorizedTab';
import firestore from '@react-native-firebase/firestore';
import { ItemOptionProps } from '../../context/Item/index.type';
import { useAuth, useItem, useTheme } from '../../context';
import { useTranslation } from 'react-i18next';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addItemToCartFavorite } from '../../context/Item/item.utils';

export type FavoriteItem = {
  cate_id?: string;
  name?: string;
  id?: string;
  imageUrl?: string;
};

const DetailScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList>>();
  const { itemId } = route.params;
  const { colors } = useTheme();
  const { items, addItem } = useItem();
  const [item, setItem] = useState<ItemOptionProps>();
  const [selectedSize, setSelectedSize] = useState('Small');
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const colorIcon = isLiked ? '#FF1818' : '#D6D4D4';
  const { t } = useTranslation();
  const { user } = useAuth();

  const getDetailItem = async () => {
    const getItem = await firestore()
      .collection('collection')
      .where('id', '==', itemId)
      .get();
    const convertDataToDocs = getItem.docs;
    const convertDataToArray = convertDataToDocs.map(
      it => it.data() as ItemOptionProps,
    );
    setItem(convertDataToArray[0]);
    setSelectedSize(
      convertDataToArray[0].sizes[
        selectedSize === 'Small' ? 0 : selectedSize === 'Medium' ? 1 : 2
      ].size,
    );
    setPrice(convertDataToArray[0].sizes[0].price);

    const userRef = firestore().collection('users').doc(`${user.id}`);
    const favorList = (await userRef.get()).data()?.favoriteList;

    // handle response all items were liked ==>>>>> hack
    setIsLiked(
      favorList
        ?.map((favor: FavoriteItem) => favor.id)
        .includes(convertDataToArray[0]?.id),
    );
  };

  const getCountForSize = () => {
    const countItem = items.find(
      ite => ite.id === itemId && ite.size === selectedSize,
    );
    setCount(countItem ? countItem.quantity : 0);
  };

  const addFavorite = async (favorItem: FavoriteItem) => {
    const userRef = firestore().collection('users').doc(`${user.id}`);
    const list = (await userRef.get()).data()?.favoriteList;

    try {
      await userRef.update({
        favoriteList: addItemToCartFavorite(list, favorItem),
      });
    } catch (error) {
      console.log('Error remove item', error);
    }
  };

  useEffect(() => {
    getDetailItem();
    getCountForSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    getCountForSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSize]);

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
      <View style={styles.detailItem}>
        <View style={styles.backgroundItem}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setIsLiked(!isLiked);
              addFavorite({
                cate_id: item?.cate_id,
                name: item?.name,
                id: item?.id,
                imageUrl: item?.imageUrl,
              });
            }}>
            <MaterialIcon name="heart" color={colorIcon} size={40} />
          </TouchableOpacity>
          <Image source={{ uri: item?.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.inforItem}>
          <Text style={[styles.title, { color: colors.primaryText }]}>
            {item?.name}
          </Text>
          <View style={[styles.content, { backgroundColor: '#F1F1F1' }]}>
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
                        sz.size === selectedSize ? '#754C24' : '#FFFFFF',
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
              label={`${t('screen.Detail.content')}   |   $${price} x ${count}`}
              borderColor="#754C24"
              backgroundColor="#754C24"
              onPress={() => {
                if (item) {
                  const formatItem = {
                    cate_id: item.cate_id,
                    id: item.id,
                    imageUrl: item.imageUrl,
                    name: item.name,
                    size: selectedSize,
                    price: price,
                    quantity: 1,
                  };
                  addItem(formatItem);
                }
              }}
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
    position: 'relative',
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
  icon: {
    position: 'absolute',
    zIndex: 99,
    right: 2,
    top: 2,
  },
});

export default DetailScreen;
