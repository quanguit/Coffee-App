import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SCREEN_MARGIN_HORIZONTAL } from '../configs/App';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const SearchBar = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <FontAwesome5Icon name="search" size={20} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={tx => setText(tx)}
        value={text}
        placeholder="Search Coffee..."
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
    width: '100%',
    height: '100%',
    fontSize: 16,
    marginLeft: 70,
  },
  icon: {
    position: 'absolute',
    bottom: 15,
    left: 20,
  },
});

export default SearchBar;
