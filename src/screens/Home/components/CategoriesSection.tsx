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
import { IC_COLDBREW, IC_ESPRESSO, IC_ITEM } from '../../../assets';
import {
  DEFAULT_SHADOW_SETTINGS,
  SCREEN_MARGIN_HORIZONTAL,
} from '../../../configs/App';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AuthorizedNavigationProp } from '../../../configs/Navigation';
import { DETAIL } from '../../../navigation/HomeStack';

const CategoriesSection = () => {
  const Menu = [
    { id: '1', name: 'Cappuchino', icon: <FontAwesomeIcon name="coffee" /> },
    { id: '2', name: 'Cold Brew', icon: <Image source={IC_COLDBREW} /> },
    { id: '3', name: 'Espresso', icon: <Image source={IC_ESPRESSO} /> },
  ];
  const [selected, setSelected] = useState(Menu[0].id);
  const navigation = useNavigation<AuthorizedNavigationProp>();

  return (
    <>
      <Text style={styles.heading}>Categories</Text>
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
                <View style={{ marginRight: 5 }}>{mn.icon}</View>
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
        {[1, 2, 3].map(i => (
          <ShadowView style={styles.shadow} key={i}>
            <TouchableOpacity onPress={() => navigation.navigate(DETAIL)}>
              <View style={styles.container1}>
                <Image source={IC_ITEM} style={styles.image} />
                <Text style={[styles.name, styles.title]}>Cappuchino</Text>
                <View style={styles.bottomCard}>
                  <Text style={styles.name}>$4.99</Text>
                  <TouchableOpacity>
                    <EntypoIcon
                      name="circle-with-plus"
                      size={30}
                      style={styles.bottomIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </ShadowView>
        ))}
      </View>
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
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 120,
    height: 120,
  },
  container1: {
    width: 160,
    height: 220,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    paddingLeft: 18,
    width: '100%',
  },
  name: {
    fontWeight: '500',
    marginTop: 10,
    fontSize: 16,
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
