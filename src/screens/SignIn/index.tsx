import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../../components/Header';
import {
  DEFAULT_KEYBOARD_AWARE_SCROLL_VIEW_CONFIGS,
  SCREEN_MARGIN_HORIZONTAL,
} from '../../configs/App';
import { Formik } from 'formik';
import Button from '../../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Header canBack />
      <View style={styles.main}>
        <Text style={styles.heading}>Sign in</Text>
        <Text style={styles.text}>Welcome back</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => console.log(values)}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <KeyboardAwareScrollView
              {...DEFAULT_KEYBOARD_AWARE_SCROLL_VIEW_CONFIGS}>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <Button onPress={handleSubmit} label="Submit" />
            </KeyboardAwareScrollView>
          )}
        </Formik>
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

export default SignInScreen;
