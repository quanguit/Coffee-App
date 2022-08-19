import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IC_LOCATION, IC_EMAIL, IC_PHONENUMBER, IC_USER } from '../../assets';
import Header from '../../components/Header';
import Input from './components/Input';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../../context';
import Button from '../../components/Button';
import {
  DEFAULT_KEYBOARD_AWARE_SCROLL_VIEW_CONFIGS,
  SCREEN_MARGIN_HORIZONTAL,
} from '../../configs/App';
import TextInput from '../../components/TextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-native-modal';

const PersonScreen = () => {
  const { colors } = useTheme();
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header title="Profile" canBack canChangeTheme />
      <Input
        image={IC_USER}
        title="Name"
        value="Patrick"
        onPress={toggleModal}
      />
      <Input
        image={IC_PHONENUMBER}
        title="Phone number"
        value="+375 33 664-57-36"
        onPress={toggleModal}
      />
      <Input
        image={IC_EMAIL}
        title="Email"
        value="adosmenesk@pm.me"
        onPress={toggleModal}
      />
      <Input
        image={IC_LOCATION}
        title="Address"
        value="HoChiMinh City"
        onPress={toggleModal}
      />
      <Button
        label="Log out"
        backgroundColor="#333333"
        wrapperStyle={styles.button}
      />
      <View style={styles.qrcode}>
        <QRCode value="https://reactnative.dev/" size={250} />
      </View>

      <Modal
        isVisible={isModalVisible}
        coverScreen={false}
        style={[styles.modal, { backgroundColor: colors.primaryBackground }]}>
        <Text
          style={[styles.title, { color: colors.primaryText, marginTop: 40 }]}>
          Edit your profile
        </Text>
        <ScrollView>
          <Formik
            initialValues={{
              username: '',
              phone_number: '',
              email: '',
              address: '',
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required('Username is required!'),
              phone_number: Yup.number().required('Phone Number is required!'),
              email: Yup.string().email('Invalid email address'),
              address: Yup.string().required('Address is required!'),
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
                  placeholder=" Your Name"
                  icon={IC_USER}
                  color={colors.primaryText}
                />
                <TextInput
                  onChangeText={handleChange('phone_number')}
                  value={values.phone_number}
                  error={errors.phone_number}
                  editable={!isSubmitting}
                  placeholder="Your Phone Number"
                  icon={IC_PHONENUMBER}
                  keyboardType="numeric"
                  color={colors.primaryText}
                />
                <TextInput
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                  editable={!isSubmitting}
                  placeholder="Your Email"
                  icon={IC_EMAIL}
                  keyboardType="email-address"
                  color={colors.primaryText}
                />
                <TextInput
                  onChangeText={handleChange('address')}
                  value={values.address}
                  error={errors.address}
                  editable={!isSubmitting}
                  placeholder="Your Address"
                  icon={IC_LOCATION}
                  color={colors.primaryText}
                />
                <View style={styles.buttonGroup}>
                  <Button
                    onPress={() => setModalVisible(false)}
                    label="Cancel"
                    style={[styles.childBtn, { marginRight: 20 }]}
                    textColor="#000000"
                  />
                  <Button
                    onPress={handleSubmit}
                    label="Save"
                    style={styles.childBtn}
                    backgroundColor="#754C24"
                  />
                </View>
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qrcode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginLeft: 'auto',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginTop: 10,
  },
  modal: {
    marginVertical: 150,
    borderRadius: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  childBtn: {
    borderRadius: 20,
    width: 100,
  },
});

export default PersonScreen;
