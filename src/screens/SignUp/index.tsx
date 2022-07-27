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

type Props = {
  navigation: NativeStackNavigationProp<UnauthorizedStackParamList>;
};

type Formvalues = {
  username: string;
  phone_number: string;
  email: string;
  password: string;
  cf_password: string;
  location: string;
};

const SignUpScreen = ({ navigation }: Props) => {
  const formRef = useRef<FormikProps<Formvalues>>(null);
  const [validateOnChange, setValidateOnChange] = useState(false);

  return (
    <View style={styles.container}>
      <Header canBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Sign up</Text>
        <Text style={styles.text}>Create an account here</Text>
        <View style={styles.form}>
          <Formik
            initialValues={{
              username: '',
              phone_number: '',
              email: '',
              password: '',
              cf_password: '',
              location: '',
            }}
            innerRef={formRef}
            validationSchema={Yup.object().shape({
              username: Yup.string().required('Username is required!'),
              phone_number: Yup.number().required('Phone number is required!'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required!'),
              password: Yup.string()
                .min(
                  PASSWORD_MIN_LENGTH,
                  `Your password must have at least ${PASSWORD_MIN_LENGTH} characters`,
                )
                .required('Password is required!'),
              cf_password: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm your password is required!'),
              location: Yup.string().required('Location is required!'),
            })}
            validateOnChange={validateOnChange}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              console.log(values);
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
                  placeholder="Create an account here"
                  icon={IC_USER}
                />
                <TextInput
                  onChangeText={handleChange('phone_number')}
                  value={values.phone_number}
                  error={errors.phone_number}
                  editable={!isSubmitting}
                  placeholder="Mobile Number"
                  icon={IC_PHONENUMBER}
                  keyboardType="numeric"
                />
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
                <TextInput
                  onChangeText={handleChange('cf_password')}
                  value={values.cf_password}
                  error={errors.cf_password}
                  editable={!isSubmitting}
                  placeholder="Confirm Password"
                  icon={IC_PASSWORD}
                  secureTextEntry
                />
                <TextInput
                  onChangeText={handleChange('location')}
                  value={values.location}
                  error={errors.location}
                  editable={!isSubmitting}
                  placeholder="Location"
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
          By signing up you agree with our Terms of Use
        </Text>
        <Text style={[styles.text, { marginVertical: 75 }]}>
          Already a member?{' '}
          <Text
            style={styles.colorText}
            onPress={() => {
              formRef.current?.resetForm();
              navigation.navigate(SIGN_IN);
            }}>
            Sign in
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
