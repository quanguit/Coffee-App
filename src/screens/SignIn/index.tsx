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
import { useApp, useAuth, useTheme } from '../../context';
import { useTranslation } from 'react-i18next';
import Toastify from '../../components/Toast';

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
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showAppLoading, hideAppLoading } = useApp();
  const { signIn } = useAuth();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header canBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>{t('screen.SignIn.signin')}</Text>
        <Text style={styles.text}>{t('screen.SignIn.content')}</Text>
        <View style={styles.form}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email(t('validation.email'))
                .required(t('validation.requiredEmail')),
              password: Yup.string()
                .min(
                  PASSWORD_MIN_LENGTH,
                  t('validation.password', { minLength: PASSWORD_MIN_LENGTH }),
                )
                .required(t('validation.requiredPassword')),
            })}
            validateOnChange={validateOnChange}
            validateOnBlur={false}
            innerRef={formRef}
            onSubmit={async (values, actions) => {
              showAppLoading();
              const { error } = await signIn(values);

              if (error) {
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
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                  editable={!isSubmitting}
                  placeholder={t('screen.SignIn.email')}
                  icon={IC_EMAIL}
                  keyboardType="email-address"
                />
                <TextInput
                  onChangeText={handleChange('password')}
                  value={values.password}
                  error={errors.password}
                  editable={!isSubmitting}
                  placeholder={t('screen.SignIn.password')}
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
                  {t('screen.SignIn.forgot')}
                </Text>
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </View>
        <Text style={[styles.text, { marginTop: 350, marginBottom: 75 }]}>
          {t('screen.SignIn.new')}{' '}
          <Text
            style={styles.colorText}
            onPress={() => {
              formRef.current?.resetForm();
              navigation.navigate(SIGN_UP);
            }}>
            {t('screen.SignIn.signup')}
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
