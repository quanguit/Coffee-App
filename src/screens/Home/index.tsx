import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { useApp, useTheme } from '../../context';
import CategoriesSection from './components/CategoriesSection';
import firestore from '@react-native-firebase/firestore';
import { ItemOptionProps } from '../../context/Item/index.type';

const HomeScreen = () => {
  const { colors } = useTheme();
  const { showAppLoading, hideAppLoading } = useApp();
  const [items, setItems] = useState<ItemOptionProps[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const getAllItems = async () => {
    showAppLoading();
    const getItems = await firestore().collection('collection').get();
    const convertDataToDocs = getItems.docs;
    const convertDataToArray = convertDataToDocs.map(
      it => it.data() as ItemOptionProps,
    );
    setItems(convertDataToArray);
    hideAppLoading();
  };

  useEffect(() => {
    getAllItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header user />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <CategoriesSection items={filteredItems} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
