import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IC_LOCATION, IC_EMAIL, IC_PHONENUMBER, IC_USER } from '../../assets';
import Header from '../../components/Header';
import Input from './components/Input';
import QRCode from 'react-native-qrcode-svg';

const PersonScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Profile" canBack />
      <Input image={IC_USER} title="Name" value="Patrick" />
      <Input
        image={IC_PHONENUMBER}
        title="Phone number"
        value="+375 33 664-57-36"
      />
      <Input image={IC_EMAIL} title="Email" value="adosmenesk@pm.me " />
      <Input
        image={IC_LOCATION}
        title="Christopher's Coffee store address"
        value="Cebu City"
      />
      <View style={styles.qrcode}>
        <QRCode value="https://reactnative.dev/" size={250} />
      </View>
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
});

export default PersonScreen;
