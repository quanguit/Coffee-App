import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IC_LOCATION, IC_EMAIL, IC_PHONENUMBER, IC_USER } from '../../assets';
import Header from '../../components/Header';
import Input from './components/Input';
import { useApp, useAuth, useLanguage, useTheme } from '../../context';
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
import firestore from '@react-native-firebase/firestore';
import { UserProps } from '../../context/Auth/index.type';
import {
  ImageLibraryOptions,
  CameraOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import PhotoView from '@merryjs/photo-viewer';

const PersonScreen = () => {
  const { colors } = useTheme();
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const { showAppLoading, hideAppLoading } = useApp();
  const { signOut, user, setUser } = useAuth();
  const [imageUrl, setImageUrl] = useState<string | undefined>(user.photoUrl);
  const [isChanged, setIsChanged] = useState(false);
  const [visiblePhoto, setVisiblePhoto] = useState(false);

  const photos = [
    {
      source: {
        uri: `${imageUrl}`,
      },
    },
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const updateProfile = async (updateUser: UserProps) => {
    showAppLoading();
    const userRef = firestore().collection('users').doc(`${updateUser.id}`);

    try {
      await userRef.update({
        ...updateUser,
        displayName: updateUser.name,
      });
      setUser(updateUser);
      toggleModal();
      hideAppLoading();
    } catch (error) {
      console.log('Error remove item', error);
    }
  };

  const showImage = () => {
    setVisiblePhoto(true);
  };

  const loadLib = async () => {
    const options: ImageLibraryOptions & CameraOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      saveToPhotos: true,
    };

    try {
      const result = await launchImageLibrary(options);
      const convertImageUrl = await ImgToBase64.getBase64String(
        result.assets?.[0]?.uri,
      );
      if (convertImageUrl !== undefined) {
        setImageUrl(`data:image/png;base64,${convertImageUrl}`);
        setIsChanged(true);
      }
    } catch (error) {
      console.log('error Image: ', error);
    }
  };

  const savePhoto = async () => {
    showAppLoading();
    const userRef = firestore().collection('users').doc(`${user.id}`);
    const newUser = { ...user, photoUrl: imageUrl };

    try {
      await userRef.update(newUser);
      setUser(newUser);
      setIsChanged(false);
      hideAppLoading();
    } catch (error) {
      console.log('Error remove item', error);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header title="Person" canBack canChangeTheme />
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={showImage}>
          <Image source={{ uri: imageUrl }} style={styles.avatar} />
        </TouchableOpacity>
        <TouchableOpacity onPress={loadLib} style={styles.icon}>
          <FontAwesome5Icon name="edit" size={20} color={colors.primaryText} />
        </TouchableOpacity>
      </View>
      {isChanged && (
        <TouchableOpacity onPress={savePhoto}>
          <Text style={[styles.textChange, { color: colors.primaryText }]}>
            {t('common.change')}
          </Text>
        </TouchableOpacity>
      )}
      <Input
        image={IC_USER}
        title={t('screen.Person.name')}
        value={user.name}
        onPress={toggleModal}
      />
      <Input
        image={IC_PHONENUMBER}
        title={t('screen.Person.phone')}
        value={user.phone}
        onPress={toggleModal}
      />
      <Input
        image={IC_EMAIL}
        title={t('screen.Person.email')}
        value={user.email}
        onPress={toggleModal}
      />
      <Input
        image={IC_LOCATION}
        title={t('screen.Person.address')}
        value={user.address}
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
          onPress={signOut}
        />
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
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required(t('validation.requiredName')),
              phone: Yup.number().required(t('validation.requiredPhone')),
              email: Yup.string()
                .email(t('validation.email'))
                .required(t('validation.requiredEmail')),
              address: Yup.string().required(t('validation.requiredAddress')),
            })}
            validateOnChange={validateOnChange}
            validateOnBlur={false}
            onSubmit={async (values, actions) => {
              await updateProfile(values);
              actions.setSubmitting(false);
              setValidateOnChange(false);
            }}>
            {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
              <KeyboardAwareScrollView
                {...DEFAULT_KEYBOARD_AWARE_SCROLL_VIEW_CONFIGS}>
                <TextInput
                  onChangeText={handleChange('name')}
                  value={values.name}
                  error={errors.name}
                  editable={!isSubmitting}
                  placeholder={t('screen.Person.name')}
                  icon={IC_USER}
                  color={colors.primaryText}
                />
                <TextInput
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  error={errors.phone}
                  editable={!isSubmitting}
                  placeholder={t('screen.Person.phone')}
                  icon={IC_PHONENUMBER}
                  keyboardType="numeric"
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
                <TextInput
                  onChangeText={handleChange('address')}
                  value={values.address}
                  error={errors.address}
                  editable={!isSubmitting}
                  placeholder={t('screen.Person.address')}
                  icon={IC_LOCATION}
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
      <PhotoView
        visible={visiblePhoto}
        data={photos}
        initial={0}
        hideStatusBar={true}
        onDismiss={() => setVisiblePhoto(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  avatarSection: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  textChange: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 6,
  },
  icon: {
    position: 'absolute',
    top: 60,
    right: 145,
  },
});

export default PersonScreen;
