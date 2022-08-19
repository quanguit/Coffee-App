import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IC_ORDERED } from '../../assets';
import Button from '../../components/Button';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AuthorizedNavigationProp } from '../../configs/Navigation';
import { HOME } from '../../navigation/AuthorizedTab';
import { useItem, useTheme } from '../../context';

const OrderedScreen = () => {
  const navigation = useNavigation<AuthorizedNavigationProp>();
  const { colors } = useTheme();
  const { deleteAllItems } = useItem();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <View style={styles.common}>
        <View style={styles.image}>
          <Image source={IC_ORDERED} />
        </View>
        <Text style={[styles.heading, { color: colors.primaryText }]}>
          Ordered
        </Text>
        <Text style={[styles.notice1, { color: colors.primaryText }]}>
          Patrick, your order has been successfully placed.
        </Text>
        <Text style={[styles.notice2, { color: colors.primaryText }]}>
          The order will be ready today {'\n'} to 18:10 at the address {'\n'}
          Cebu City
        </Text>
        <Text style={[styles.notice1, { color: colors.primaryText }]}>
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
