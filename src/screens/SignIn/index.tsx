import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import {
  DEFAULT_KEYBOARD_AWARE_SCROLL_VIEW_CONFIGS,
  PASSWORD_MIN_LENGTH,
  SCREEN_MARGIN_HORIZONTAL,
} from '../../configs/App';
import { Formik, FormikProps } from 'formik';
import Button from '../../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../../components/TextInput';
import { IC_EMAIL, IC_PASSWORD } from '../../assets';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  FORGOT_PASSWORD,
  SIGN_UP,
  UnauthorizedStackParamList,
} from '../../navigation/UnauthorizedStack';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';

type Props = {
  navigation: NativeStackNavigationProp<UnauthorizedStackParamList>;
};

type FormValues = {
  email: string;
  password: string;
};

const SignInScreen = ({ navigation }: Props) => {
  const formRef = useRef<FormikProps<FormValues>>(null);
  const [validateOnChange, setValidateOnChange] = useState(false);

  return (
    <View style={styles.container}>
      <Header canBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Sign in</Text>
        <Text style={styles.text}>Welcome back</Text>
        <View style={styles.form}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required!'),
              password: Yup.string()
                .min(
                  PASSWORD_MIN_LENGTH,
                  `Your password must have at least ${PASSWORD_MIN_LENGTH} characters`,
                )
                .required('Password is required!'),
            })}
            validateOnChange={validateOnChange}
            validateOnBlur={false}
            innerRef={formRef}
            onSubmit={(values, actions) => {
              console.log(values);
              actions.setSubmitting(false);
              setValidateOnChange(false);
            }}>
            {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
              <KeyboardAwareScrollView
                {...DEFAULT_KEYBOARD_AWARE_SCROLL_VIEW_CONFIGS}>
                <TextInput
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                  editable={!isSubmitting}
                  placeholder="Email address"
                  icon={IC_EMAIL}
                  keyboardType="email-address"
                />
                <TextInput
                  onChangeText={handleChange('password')}
                  value={values.password}
                  error={errors.password}
                  editable={!isSubmitting}
                  placeholder="Password"
                  icon={IC_PASSWORD}
                  secureTextEntry
                />
                <Button
                  onPress={handleSubmit}
                  label="Submit"
                  style={styles.btnSubmit}
                />
                <Text
                  style={styles.forgotText}
                  onPress={() => {
                    formRef.current?.resetForm();
                    navigation.navigate(FORGOT_PASSWORD);
                  }}>
                  Forgot Password?
                </Text>
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </View>
        <Text style={[styles.text, { marginTop: 350, marginBottom: 75 }]}>
          New member?{' '}
          <Text
            style={styles.colorText}
            onPress={() => {
              formRef.current?.resetForm();
              navigation.navigate(SIGN_UP);
            }}>
            Sign up
          </Text>
        </Text>
      </ScrollView>
      <Button
        icon={<AntDesignIcon name="arrowright" size={25} color="white" />}
        wrapperStyle={styles.button}
        borderColor="#754C24"
        backgroundColor="#754C24"
        onPress={() => {
          setValidateOnChange(true);
          formRef.current?.handleSubmit();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#AAAA',
    fontWeight: '500',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginTop: 12,
    marginBottom: 24,
  },
  form: {
    marginTop: 32,
  },
  forgotText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  colorText: {
    color: '#324A59',
  },
  btnSubmit: {
    display: 'none',
  },
  button: {
    width: 64,
    height: 64,
    position: 'absolute',
    bottom: 120,
    right: 30,
  },
});

export default SignInScreen;
