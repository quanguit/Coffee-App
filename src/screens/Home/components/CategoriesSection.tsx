import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { IC_COLDBREW, IC_ESPRESSO } from '../../../assets';
import {
  DEFAULT_SHADOW_SETTINGS,
  SCREEN_MARGIN_HORIZONTAL,
} from '../../../configs/App';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AuthorizedNavigationProp } from '../../../configs/Navigation';
import { DETAIL } from '../../../navigation/HomeStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ItemOptionProps } from '../../../context/Item/index.type';
import { useApp, useTheme } from '../../../context';
import AdvertisementSection from './AdvertisementSection';
import { useTranslation } from 'react-i18next';

type Props = {
  items: ItemOptionProps[];
};

const CategoriesSection = ({ items }: Props) => {
  const navigation = useNavigation<AuthorizedNavigationProp>();
  const { colors } = useTheme();
  const { appLoading } = useApp();
  const { t } = useTranslation();

  const Menu = [
    {
      id: '1',
      name: t('screen.Home.coffee'),
      icon: <FontAwesomeIcon name="coffee" />,
    },
    {
      id: '2',
      name: t('screen.Home.tea'),
      icon: <Image source={IC_COLDBREW} />,
    },
    {
      id: '3',
      name: t('screen.Home.icedBlended'),
      icon: <Image source={IC_ESPRESSO} />,
    },
    {
      id: '4',
      name: t('screen.Home.cake'),
      icon: <MaterialCommunityIcons name="cupcake" size={15} />,
    },
  ];

  const [selected, setSelected] = useState(Menu[0].id);

  return (
    <>
      <Text style={[styles.heading, { color: colors.primaryText }]}>
        {t('screen.Home.title')}
      </Text>
      <View style={styles.menu}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Menu.map((mn, index) => (
            <TouchableOpacity
              style={[
                styles.item,
                {
                  marginLeft: index === 0 ? 0 : 10,
                  backgroundColor: mn.id === selected ? '#754C24' : '#F5F5F5',
                },
              ]}
              key={mn.id}
              onPress={() => setSelected(mn.id)}>
              <View style={styles.menuItem}>
                <View style={{ marginRight: 8 }}>{mn.icon}</View>
                <Text
                  style={[
                    styles.text,
                    { color: mn.id === selected ? '#FFFFFF' : '#000000' },
                  ]}>
                  {mn.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.card}>
        {items.map(
          (item: ItemOptionProps) =>
            item.cate_id == selected && (
              <ShadowView style={styles.shadow} key={item.id}>
                <View style={styles.container_detail}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(DETAIL, { itemId: item.id })
                    }>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.name, styles.title]}>{item.name}</Text>
                  <View style={styles.bottomCard}>
                    <Text style={styles.name}>$ {item.sizes[0].price}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(DETAIL, { itemId: item.id })
                      }>
                      <EntypoIcon
                        name="circle-with-plus"
                        size={30}
                        style={styles.bottomIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </ShadowView>
            ),
        )}
      </View>
      {!appLoading ? <AdvertisementSection /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 10,
    marginTop: 20,
  },
  menu: {
    flexDirection: 'column',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
  item: {
    backgroundColor: '#754C24',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '500',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
  shadow: {
    ...DEFAULT_SHADOW_SETTINGS,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    borderRadius: 16,
    marginTop: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  container_detail: {
    width: 160,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 16,
  },
  title: {
    paddingHorizontal: 18,
    width: '100%',
  },
  name: {
    fontWeight: '500',
    marginTop: 10,
    fontSize: 14,
  },
  bottomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 18,
  },
  bottomIcon: {
    marginTop: 10,
  },
});

export default CategoriesSection;
