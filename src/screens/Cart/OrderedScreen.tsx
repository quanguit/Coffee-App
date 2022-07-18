import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IC_ORDERED } from '../../assets';
import Button from '../../components/Button';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AuthorizedNavigationProp } from '../../configs/Navigation';
import { HOME } from '../../navigation/AuthorizedTab';

// === lam chuc nang sau khi navigate den home thi chi quay tro lai page cart chu khong phai ordered
const OrderedScreen = () => {
  const navigation = useNavigation<AuthorizedNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.common}>
        <View style={styles.image}>
          <Image source={IC_ORDERED} />
        </View>
        <Text style={styles.heading}>Ordered</Text>
        <Text style={styles.notice1}>
          Patrick, your order has been successfully placed.
        </Text>
        <Text style={styles.notice2}>
          The order will be ready today {'\n'} to 18:10 at the address {'\n'}
          Cebu City
        </Text>
        <Text style={styles.notice1}>
          Submit your personal QR code {'\n'} at a coffee shop to receive an
          order.
        </Text>
      </View>
      <Button
        icon={<AntDesignIcon name="arrowright" size={25} color="white" />}
        wrapperStyle={styles.button}
        borderColor="#754C24"
        backgroundColor="#754C24"
        onPress={() => {
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
