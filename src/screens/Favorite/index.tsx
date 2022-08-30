import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { SCREEN_MARGIN_HORIZONTAL } from '../../configs/App';
import { useAuth, useTheme } from '../../context';
import FavoriteItem from './components/FavoriteItem';
import firestore from '@react-native-firebase/firestore';
import { FavoriteItem as _FavoriteItem } from '../Detail';

const FavoriteScreen = () => {
  const [data, setData] = useState<_FavoriteItem[]>([]);
  const { isDark, colors } = useTheme();
  const { t } = useTranslation();
  const { user } = useAuth();

  useEffect(() => {
    const getFavoriteList = async () => {
      const userRef = firestore().collection('users').doc(`${user.id}`);
      const favoriteList = (await userRef.get()).data()?.favoriteList;
      setData(favoriteList);
    };
    getFavoriteList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header user canBack />
      <Text style={[styles.heading, { color: colors.primaryText }]}>
        {t('screen.Favorite.title')}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.section,
          { backgroundColor: isDark ? '#205375' : '#CFD2CF' },
        ]}>
        {data.length !== 0 ? (
          <>
            <Text style={[styles.content, { color: colors.primaryText }]}>
              {t('screen.Favorite.yourFavor')}
            </Text>
            <View style={styles.favorItems}>
              {data.map(item => (
                <FavoriteItem
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  image={item.imageUrl}
                />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.sectionTitle}>
            <Text style={[styles.title, { color: colors.primaryText }]}>
              {t('screen.Favorite.message')}
            </Text>
          </View>
        )}
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
  },
  section: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  favorItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
  sectionTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 50,
    maxWidth: 300,
    lineHeight: 30,
  },
});

export default FavoriteScreen;
