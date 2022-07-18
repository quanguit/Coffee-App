import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { MAIN_BG, MAIN_LOGO } from '../../assets';
import Button from '../../components/Button';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  SELECTION,
  UnauthorizedStackParamList,
} from '../../navigation/UnauthorizedStack';

type Props = {
  navigation: NativeStackNavigationProp<UnauthorizedStackParamList>;
};

const IntroduceScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={MAIN_BG}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.logoView}>
        <Image source={MAIN_LOGO} style={styles.logo} />
      </View>
      <Text style={styles.text}>Coffee that makes you happy</Text>
      <Button
        icon={<AntDesignIcon name="arrowright" size={25} color="black" />}
        wrapperStyle={styles.button}
        borderColor="white"
        backgroundColor="white"
        onPress={() => navigation.navigate(SELECTION)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  logoView: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    top: '65%',
    width: '100%',
    textAlign: 'center',
  },
  button: {
    width: 64,
    height: 64,
    position: 'absolute',
    bottom: 50,
    right: 30,
  },
});

export default IntroduceScreen;
