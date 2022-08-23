import { Formik, FormikProps } from 'formik';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IC_EMAIL } from '../../assets';
import Button from '../../components/Button';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import {
  DEFAULT_KEYBOARD_AWARE_SCROLL_VIEW_CONFIGS,
  SCREEN_MARGIN_HORIZONTAL,
} from '../../configs/App';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UnauthorizedStackParamList } from '../../navigation/UnauthorizedStack';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NativeStackNavigationProp<UnauthorizedStackParamList>;
};

type Formvalues = {
  email: string;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const formRef = useRef<FormikProps<Formvalues>>(null);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Header canBack />
      <Text style={styles.heading}>{t('screen.Forgot.title')}</Text>
      <Text style={styles.text}>{t('screen.Forgot.content')}</Text>
      <View style={styles.form}>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email(t('validation.email'))
              .required(t('validation.requiredEmail')),
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
                placeholder={t('screen.Forgot.email')}
                icon={IC_EMAIL}
                keyboardType="email-address"
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
  main: {
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
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
});

export default ForgotPasswordScreen;
