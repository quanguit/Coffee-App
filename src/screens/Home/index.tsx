import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import AdvertisementSection from './components/AdvertisementSection';
import CategoriesSection from './components/CategoriesSection';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header user />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar />
        <CategoriesSection />
        <AdvertisementSection />
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
