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

type Props = {
  toggleModal: () => void;
};

const OrderPayment = ({ toggleModal }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [method, setMethod] = useState('');
  const navigation = useNavigation<AuthorizedNavigationProp>();

  const onSelect = (index: any, value: any) => {
    console.log(index, value);
    setMethod(value);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Order payment</Text>
      <View style={styles.sectionPayment}>
        <View style={styles.introduce}>
          <View style={styles.icon}>
            <FeatherIcon name="shopping-cart" size={25} color="black" />
          </View>
          <View>
            <Text style={{ fontWeight: '600' }}>Patrick</Text>
            <Text>Christopher's Coffee store</Text>
            <Text>Cebu City</Text>
          </View>
        </View>

        <RadioGroup
          onSelect={(index: any, value: any) => onSelect(index, value)}
          color="black"
          highlightColor="#F7F8FB"
          selectedIndex={0}>
          <RadioButton value={'online_payment'} style={styles.methodPayment}>
            <View style={styles.paymentItem}>
              <View style={{ flexGrow: 1 }}>
                <Text style={[styles.title, { marginBottom: 8 }]}>
                  Online payment
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
                  Credit Card
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
          <Text style={styles.title}>Amount</Text>
          <Text style={styles.title}>$ 9.00</Text>
        </View>
      </View>
      <View style={styles.payment}>
        <View style={styles.content}>
          <Text style={styles.titlePrice}>Total Price</Text>
          <Text style={styles.price}>$16.98</Text>
        </View>
        <Button
          label="Pay Now"
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
            toggleModal();
            navigation.navigate(ORDERED);
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
    marginTop: 100,
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
    marginTop: 20,
    position: 'absolute',
    bottom: 60,
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
