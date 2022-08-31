import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IC_ORDERED } from '../../assets';
import Button from '../../components/Button';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AuthorizedNavigationProp } from '../../configs/Navigation';
import { HOME } from '../../navigation/AuthorizedTab';
import { useAuth, useItem, useTheme } from '../../context';
import { useTranslation } from 'react-i18next';

const OrderedScreen = () => {
  const navigation = useNavigation<AuthorizedNavigationProp>();
  const { colors } = useTheme();
  const { deleteAllItems } = useItem();
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <View style={styles.common}>
        <View style={styles.image}>
          <Image source={IC_ORDERED} />
        </View>
        <Text style={[styles.heading, { color: colors.primaryText }]}>
          {t('notification.ordered')}
        </Text>
        <Text style={[styles.notice1, { color: colors.primaryText }]}>
          {t('notification.title1', { name: user.name })}
        </Text>
        <Text style={[styles.notice2, { color: colors.primaryText }]}>
          {t('notification.title2', { address: user.address })}
        </Text>
        <Text style={[styles.notice1, { color: colors.primaryText }]}>
          {t('notification.title3')}
        </Text>
      </View>
      <Button
        icon={<AntDesignIcon name="arrowright" size={25} color="white" />}
        wrapperStyle={styles.button}
        borderColor="#754C24"
        backgroundColor="#754C24"
        onPress={() => {
          deleteAllItems();
          navigation.popToTop();
          navigation.navigate(HOME);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  common: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  notice1: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 30,
  },
  notice2: {
    fontWeight: '600',
    marginVertical: 32,
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 30,
  },
  button: {
    width: 64,
    height: 64,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});

export default OrderedScreen;
