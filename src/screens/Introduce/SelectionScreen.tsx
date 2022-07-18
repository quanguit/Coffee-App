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

type Props = {
  navigation: NativeStackNavigationProp<UnauthorizedStackParamList>;
};

const SelectionScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Header canBack />
      <View style={styles.main}>
        <Text style={styles.text}>Select an option</Text>
        <Button
          borderColor="black"
          backgroundColor="black"
          label="Login"
          style={styles.button}
          fontSize={22}
          onPress={() => navigation.navigate(SIGN_IN)}
        />
        <Text style={styles.or}>Or</Text>
        <Button
          borderColor="black"
          backgroundColor="black"
          label="Create An Account"
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
