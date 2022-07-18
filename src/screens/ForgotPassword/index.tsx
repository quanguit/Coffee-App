import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { SCREEN_MARGIN_HORIZONTAL } from '../../configs/App';

const ForgotPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Header canBack />
      <View style={styles.main}>
        <Text style={styles.heading}>Forgot Password?</Text>
        <Text style={styles.text}>Enter your email address</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default ForgotPasswordScreen;
