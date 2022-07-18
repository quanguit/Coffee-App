import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { SCREEN_MARGIN_HORIZONTAL } from '../../configs/App';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Header canBack />
      <View style={styles.main}>
        <Text style={styles.heading}>Sign up</Text>
        <Text style={styles.text}>Create an account here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
  text: {
    color: '#AAAA',
    fontWeight: '500',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 24,
  },
});

export default SignUpScreen;
