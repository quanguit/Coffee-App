import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { useTheme } from '../../context';
import CategoriesSection from './components/CategoriesSection';

const HomeScreen = () => {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header user />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar />
        <CategoriesSection />
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
