import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import {
  SIGN_IN,
  SIGN_UP,
  UnauthorizedStackParamList,
} from '../../navigation/UnauthorizedStack';
import { useTheme } from '../../context';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NativeStackNavigationProp<UnauthorizedStackParamList>;
};

const SelectionScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header canBack />
      <View style={styles.main}>
        <Text style={styles.text}>{t('screen.Selection.title')}</Text>
        <Button
          borderColor="black"
          backgroundColor="black"
          label={t('screen.Selection.signin')}
          style={styles.button}
          fontSize={22}
          onPress={() => navigation.navigate(SIGN_IN)}
        />
        <Text style={styles.or}>{t('screen.Selection.or')}</Text>
        <Button
          borderColor="black"
          backgroundColor="black"
          label={t('screen.Selection.signup')}
          style={styles.button}
          fontSize={22}
          onPress={() => navigation.navigate(SIGN_UP)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
    marginVertical: 50,
  },
  button: {
    width: 300,
    fontSize: 50,
  },
  or: {
    textDecorationLine: 'underline',
    marginVertical: 18,
  },
});

export default SelectionScreen;
