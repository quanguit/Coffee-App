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

type Props = {
  title?: string;
  user?: boolean;
  canBack?: boolean;
};

const Header = ({ user, canBack, title }: Props) => {
  const navigation = useNavigation<AuthorizedNavigationProp>();

  return (
    <ShadowView>
      <SafeAreaView style={styles.container}>
        {canBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicon name="arrow-back" size={25} />
          </TouchableOpacity>
        )}
        {title && (
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.title,
                { marginRight: canBack && !user ? 70 : 0 },
                { marginLeft: !canBack && user ? 70 : 0 },
              ]}>
              {title}
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
      </SafeAreaView>
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginRight: 'auto',
  },
});

export default Header;
