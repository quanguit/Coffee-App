import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IC_LOCATION, IC_EMAIL, IC_PHONENUMBER, IC_USER } from '../../assets';
import Header from '../../components/Header';
import Input from './components/Input';
import QRCode from 'react-native-qrcode-svg';
import { useLanguage, useTheme } from '../../context';
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
import { useTranslation } from 'react-i18next';

const PersonScreen = () => {
  const { colors } = useTheme();
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header title="Profile" canBack canChangeTheme />
      <Input
        image={IC_USER}
        title={t('screen.Person.name')}
        value="Patrick"
        onPress={toggleModal}
      />
      <Input
        image={IC_PHONENUMBER}
        title={t('screen.Person.phone')}
        value="+375 33 664-57-36"
        onPress={toggleModal}
      />
      <Input
        image={IC_EMAIL}
        title={t('screen.Person.email')}
        value="adosmenesk@pm.me"
        onPress={toggleModal}
      />
      <Input
        image={IC_LOCATION}
        title={t('screen.Person.address')}
        value="HoChiMinh City"
        onPress={toggleModal}
      />
      <View style={styles.sectionBottom}>
        <TouchableOpacity
          onPress={() => changeLanguage(language)}
          style={[
            styles.changeIcon,
            {
              backgroundColor: colors.primaryBackground,
              shadowColor: colors.primaryText,
            },
          ]}>
          <Text style={{ color: colors.primaryText, fontSize: 12 }}>
            {language.toUpperCase()}
          </Text>
        </TouchableOpacity>
        <Button
          label={t('common.logout')}
          backgroundColor="#333333"
          style={{ width: 100 }}
        />
      </View>
      <View style={styles.qrcode}>
        <QRCode value="https://reactnative.dev/" size={250} />
      </View>

      <Modal
        isVisible={isModalVisible}
        coverScreen={false}
        style={[styles.modal, { backgroundColor: colors.primaryBackground }]}>
        <Text
          style={[styles.title, { color: colors.primaryText, marginTop: 40 }]}>
          {language === 'en' ? 'Edit your profile' : 'Chỉnh sửa hồ sơ'}
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
              username: Yup.string().required(t('validation.requiredName')),
              phone_number: Yup.number().required(
                t('validation.requiredPhone'),
              ),
              email: Yup.string()
                .email(t('validation.email'))
                .required(t('validation.requiredEmail')),
              address: Yup.string().required(t('validation.requiredAddress')),
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
                  placeholder={t('screen.Person.name')}
                  icon={IC_USER}
                  color={colors.primaryText}
                />
                <TextInput
                  onChangeText={handleChange('phone_number')}
                  value={values.phone_number}
                  error={errors.phone_number}
                  editable={!isSubmitting}
                  placeholder={t('screen.Person.phoneNumber')}
                  icon={IC_PHONENUMBER}
                  keyboardType="numeric"
                  color={colors.primaryText}
                />
                <TextInput
                  onChangeText={handleChange('address')}
                  value={values.address}
                  error={errors.address}
                  editable={!isSubmitting}
                  placeholder={t('screen.Person.address')}
                  icon={IC_LOCATION}
                  color={colors.primaryText}
                />
                <TextInput
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                  editable={!isSubmitting}
                  placeholder={t('screen.Person.email')}
                  icon={IC_EMAIL}
                  keyboardType="email-address"
                  color={colors.primaryText}
                />
                <View style={styles.buttonGroup}>
                  <Button
                    onPress={() => setModalVisible(false)}
                    label={t('common.cancel')}
                    style={[styles.childBtn, { marginRight: 20 }]}
                    textColor="#000000"
                  />
                  <Button
                    onPress={handleSubmit}
                    label={t('common.save')}
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
  sectionBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  childBtn: {
    borderRadius: 20,
    width: 100,
  },
  changeIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
  },
});

export default PersonScreen;
