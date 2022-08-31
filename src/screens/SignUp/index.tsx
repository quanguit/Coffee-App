import { Formik, FormikProps } from 'formik';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  IC_EMAIL,
  IC_LOCATION,
  IC_PASSWORD,
  IC_PHONENUMBER,
  IC_USER,
} from '../../assets';
import Button from '../../components/Button';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import {
  DEFAULT_KEYBOARD_AWARE_SCROLL_VIEW_CONFIGS,
  PASSWORD_MIN_LENGTH,
  SCREEN_MARGIN_HORIZONTAL,
} from '../../configs/App';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  SIGN_IN,
  UnauthorizedStackParamList,
} from '../../navigation/UnauthorizedStack';
import * as Yup from 'yup';
import { useApp, useAuth, useTheme } from '../../context';
import { useTranslation } from 'react-i18next';
import Toastify from '../../components/Toast';

type Props = {
  navigation: NativeStackNavigationProp<UnauthorizedStackParamList>;
};

export type Formvalues = {
  username?: string;
  phone?: string;
  email: string;
  password: string;
  cf_password?: string;
  address?: string;
};

const SignUpScreen = ({ navigation }: Props) => {
  const formRef = useRef<FormikProps<Formvalues>>(null);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showAppLoading, hideAppLoading } = useApp();
  const { signUp } = useAuth();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header canBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>{t('screen.SignUp.signup')}</Text>
        <Text style={styles.text}>{t('screen.SignUp.content')}</Text>
        <View style={styles.form}>
          <Formik
            initialValues={{
              username: '',
              phone: '',
              email: '',
              password: '',
              cf_password: '',
              address: '',
            }}
            innerRef={formRef}
            validationSchema={Yup.object().shape({
              username: Yup.string().required(t('validation.requiredName')),
              phone: Yup.number().required(t('validation.requiredPhone')),
              email: Yup.string()
                .email(t('validation.email'))
                .required(t('validation.requiredEmail')),
              password: Yup.string()
                .min(
                  PASSWORD_MIN_LENGTH,
                  t('validation.password', { minLength: PASSWORD_MIN_LENGTH }),
                )
                .required(t('validation.requiredPassword')),
              cf_password: Yup.string()
                .oneOf([Yup.ref('password')], t('validation.CFPassword'))
                .required(t('validation.requiredCFPassword')),
              address: Yup.string().required(t('validation.requiredAddress')),
            })}
            validateOnChange={validateOnChange}
            validateOnBlur={false}
            onSubmit={async (values, actions) => {
              showAppLoading();
              const { data, error } = await signUp(values);
              // console.log('data: ', data);

              if (data) {
                Toastify({
                  type: 'success',
                  text1: 'You registered successfully!',
                });
                navigation.popToTop();
                navigation.navigate(SIGN_IN);
              } else {
                Toastify({
                  type: 'error',
                  text1: `${error}`,
                });
              }
              hideAppLoading();
              actions.setSubmitting(false);
              setValidateOnChange(false);
            }}>
            {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
              <KeyboardAwareScrollView
                {...DEFAULT_KEYBOARD_AWARE_SCROLL_VIEW_CONFIGS}>
                <TextInput
                  onChangeText={handleChange('username')}
                  value={values.username}
                  error={errors.username}
                  editable={!isSubmitting}
                  placeholder={t('screen.SignUp.name')}
                  icon={IC_USER}
                />
                <TextInput
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  error={errors.phone}
                  editable={!isSubmitting}
                  placeholder={t('screen.SignUp.phone')}
                  icon={IC_PHONENUMBER}
                  keyboardType="numeric"
                  maxLength={11}
                />
                <TextInput
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                  editable={!isSubmitting}
                  placeholder={t('screen.SignUp.email')}
                  icon={IC_EMAIL}
                  keyboardType="email-address"
                />
                <TextInput
                  onChangeText={handleChange('password')}
                  value={values.password}
                  error={errors.password}
                  editable={!isSubmitting}
                  placeholder={t('screen.SignUp.password')}
                  icon={IC_PASSWORD}
                  secureTextEntry
                />
                <TextInput
                  onChangeText={handleChange('cf_password')}
                  value={values.cf_password}
                  error={errors.cf_password}
                  editable={!isSubmitting}
                  placeholder={t('screen.SignUp.confirm')}
                  icon={IC_PASSWORD}
                  secureTextEntry
                />
                <TextInput
                  onChangeText={handleChange('address')}
                  value={values.address}
                  error={errors.address}
                  editable={!isSubmitting}
                  placeholder={t('screen.SignUp.address')}
                  icon={IC_LOCATION}
                />
                <Button
                  onPress={handleSubmit}
                  label="Submit"
                  style={styles.btnSubmit}
                />
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </View>
        <Text style={[styles.text, styles.colorText, { textAlign: 'center' }]}>
          {t('screen.SignUp.term')}
        </Text>
        <Text style={[styles.text, { marginVertical: 75 }]}>
          {t('screen.SignUp.isMember')}{' '}
          <Text
            style={styles.colorText}
            onPress={() => {
              formRef.current?.resetForm();
              navigation.navigate(SIGN_IN);
            }}>
            {t('screen.SignUp.signin')}
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
    backgroundColor: 'white',
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
  colorText: {
    color: '#324A59',
  },
});

export default SignUpScreen;
