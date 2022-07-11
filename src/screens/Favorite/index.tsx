import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

type Props = {
  name: string;
};

const FavoriteScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Header canBack title="Favorite" />
      <Text>FavoriteScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FavoriteScreen;
