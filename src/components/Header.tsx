import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { HEADER_HEIGHT, SCREEN_MARGIN_HORIZONTAL } from '../configs/App';
import ShadowView from 'react-native-simple-shadow-view';
import { IC_AVATAR } from '../assets';
import { NavigationScreenProp } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';
import { AllScreenNavigationProp } from '../configs/Navigation';

type Props = {
  title?: string;
  user?: boolean;
  canBack?: boolean;
  navigation?: NavigationScreenProp<any, any>;
};

const Header = ({ user, canBack }: Props) => {
  const navigation = useNavigation<AllScreenNavigationProp>();

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
        {user && (
          <View style={styles.titleContainer}>
            <Image source={IC_AVATAR} style={styles.avatar} />
          </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  backButton: {
    marginLeft: SCREEN_MARGIN_HORIZONTAL - 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 'auto',
  },
});

export default Header;
