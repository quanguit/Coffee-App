import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SCREEN_MARGIN_HORIZONTAL } from '../../../configs/App';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../../../components/Button';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { LOGO_ASSIST, LOGO_MASTERCARD, LOGO_VISA } from '../../../assets';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AuthorizedNavigationProp } from '../../../configs/Navigation';
import { ORDERED } from '../../../navigation/CartStack';
import { totalPrice, totalQuantity } from '../../../context/Item/item.utils';
import { useApp, useAuth, useItem } from '../../../context';
import Toastify from '../../../components/Toast';
import { useTranslation } from 'react-i18next';

type Props = {
  toggleModal: () => void;
};

const OrderPayment = ({ toggleModal }: Props) => {
  const [method, setMethod] = useState('online_payment');
  const navigation = useNavigation<AuthorizedNavigationProp>();
  const { items } = useItem();
  const { showAppLoading, hideAppLoading } = useApp();
  const { t } = useTranslation();
  const { user } = useAuth();

  const onSelect = (index: any, value: any) => {
    setMethod(value);
  };

  const showToast = (_method: string) => {
    Toastify({
      type: 'success',
      text1: `You paid ${
        _method === 'online_payment' ? 'online' : 'by credit card'
      } and ordered successfully`,
      text2: 'Your order will be transfered on time 👋',
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{t('screen.Cart.titleModal')}</Text>
      <View style={styles.sectionPayment}>
        <View style={styles.introduce}>
          <View style={styles.icon}>
            <FeatherIcon name="shopping-cart" size={25} color="black" />
          </View>
          <View>
            <Text style={{ fontWeight: '600' }}>{user.name}</Text>
            <Text>Christ's Coffee store</Text>
            <Text>{user.address}</Text>
          </View>
        </View>

        <RadioGroup
          onSelect={(index: number, value: string) => onSelect(index, value)}
          color="black"
          highlightColor="#F7F8FB"
          selectedIndex={0}>
          <RadioButton value={'online_payment'} style={styles.methodPayment}>
            <View style={styles.paymentItem}>
              <View style={{ flexGrow: 1 }}>
                <Text style={[styles.title, { marginBottom: 8 }]}>
                  {t('screen.Cart.online')}
                </Text>
                <Text style={{ color: '#00183338' }}>Assist Philippines</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 52 }}>
                <Image source={LOGO_ASSIST} />
              </View>
            </View>
          </RadioButton>

          <RadioButton value={'credit_card'} style={styles.methodPayment}>
            <View style={styles.paymentItem}>
              <View style={{ flexGrow: 1 }}>
                <Text style={[styles.title, { marginBottom: 8 }]}>
                  {t('screen.Cart.credit')}
                </Text>
                <Text style={{ color: '#00183338' }}>2540 xxxx xxxx 2648</Text>
              </View>
              <View style={styles.imageSection}>
                <Image source={LOGO_VISA} />
                <Image source={LOGO_MASTERCARD} />
              </View>
            </View>
          </RadioButton>
        </RadioGroup>

        <View style={styles.total}>
          <Text style={styles.title}>{t('screen.Cart.quantity')}:</Text>
          <Text style={styles.title}>{totalQuantity(items)}</Text>
        </View>
      </View>
      <View style={styles.payment}>
        <View style={styles.content}>
          <Text style={styles.titlePrice}>{t('screen.Cart.totalPrice')}</Text>
          <Text style={styles.price}>${totalPrice(items)}</Text>
        </View>
        <Button
          label={t('screen.Cart.pay')}
          borderColor="#324A59"
          backgroundColor="#324A59"
          icon={
            <AntDesignIcon
              name="creditcard"
              size={25}
              color="white"
              style={{ marginRight: 20 }}
            />
          }
          style={styles.button}
          onPress={() => {
            showAppLoading();
            setTimeout(() => {
              hideAppLoading();
              toggleModal();
              navigation.navigate(ORDERED);
              showToast(method);
            }, 2000);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'relative',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginVertical: 30,
  },
  sectionPayment: {
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
  introduce: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  methodPayment: {
    backgroundColor: '#F7F8FB',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 16,
  },
  paymentItem: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 17,
  },
  imageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 52,
  },
  total: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    backgroundColor: '#F7F8FB',
    padding: 16,
    borderRadius: 15,
    marginRight: 24,
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  content: {
    flexDirection: 'column',
  },
  titlePrice: {
    marginBottom: 10,
    fontWeight: '600',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 30,
  },
  button: {
    width: 180,
  },
});

export default OrderPayment;
