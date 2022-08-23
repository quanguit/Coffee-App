import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { HEADER_HEIGHT, SCREEN_MARGIN_HORIZONTAL } from '../configs/App';
import ShadowView from 'react-native-simple-shadow-view';
import { IC_AVATAR } from '../assets';
import { useNavigation } from '@react-navigation/native';
import { PERSON } from '../navigation/AuthorizedTab';
import { AuthorizedNavigationProp } from '../configs/Navigation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useTheme } from '../context';
import { useTranslation } from 'react-i18next';

type Props = {
  title?: string;
  user?: boolean;
  canBack?: boolean;
  canChangeTheme?: boolean;
};

const Header = ({ user, canBack, title, canChangeTheme }: Props) => {
  const navigation = useNavigation<AuthorizedNavigationProp>();
  const { isDark, colors, changeTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <ShadowView style={{ backgroundColor: colors.primaryBackground }}>
      <SafeAreaView style={styles.container}>
        {canBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicon name="arrow-back" size={25} color={colors.primaryText} />
          </TouchableOpacity>
        )}
        {title && (
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.title,
                { marginRight: canBack && !user ? 70 : 0 },
                { marginLeft: !canBack && user ? 70 : 0 },
                { color: colors.primaryText },
              ]}>
              {t('screen.Person.header')}
            </Text>
          </View>
        )}
        {user && (
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => navigation.navigate(PERSON)}>
            <Image source={IC_AVATAR} style={styles.avatar} />
          </TouchableOpacity>
        )}
        {canChangeTheme && (
          <TouchableOpacity
            onPress={changeTheme}
            style={[
              styles.changeIcon,
              {
                backgroundColor: colors.primaryBackground,
                shadowColor: colors.primaryText,
              },
            ]}>
            {isDark ? (
              <EntypoIcon name="light-down" size={27} color="#FFFFFF" />
            ) : (
              <Fontisto name="night-clear" size={15} />
            )}
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: HEADER_HEIGHT,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 15,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: SCREEN_MARGIN_HORIZONTAL - 12,
    marginLeft: 'auto',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#333333',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    marginLeft: SCREEN_MARGIN_HORIZONTAL - 12,
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  changeIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: SCREEN_MARGIN_HORIZONTAL - 12,
    position: 'absolute',
    right: 0,
    bottom: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
  },
});

export default Header;
