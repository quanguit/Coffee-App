import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SCREEN_MARGIN_HORIZONTAL } from '../configs/App';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const SearchBar = ({ searchValue, setSearchValue }: Props) => {
  const changeText = debounce(value => setSearchValue(value), 1000);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <FontAwesome5Icon name="search" size={20} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={tx => changeText(tx)}
        defaultValue={searchValue}
        placeholder={t('screen.Home.search')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    position: 'relative',
  },
  input: {
    maxWidth: 250,
    height: '100%',
    fontSize: 16,
    marginLeft: 70,
    borderRadius: 25,
  },
  icon: {
    position: 'absolute',
    bottom: 15,
    left: 20,
  },
});

export default SearchBar;
