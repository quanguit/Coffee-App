import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IMAGE_ITEM_FAVOR } from '../../assets';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { SCREEN_MARGIN_HORIZONTAL } from '../../configs/App';
import CartItem from './components/CartItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import OrderPayment from './components/OrderPayment';
import Modal from 'react-native-modal';
import { useTheme } from '../../context/Theme';

const CartScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState([
    {
      id: '0',
      title: 'Americano',
      image: IMAGE_ITEM_FAVOR,
      quantity: 1,
      price: 5.99,
    },
    {
      id: '1',
      title: 'Americano',
      image: IMAGE_ITEM_FAVOR,
      quantity: 2,
      price: 6.99,
    },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <Header canBack />
      <Text style={[styles.heading, { color: colors.primaryText }]}>
        My order
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map(item => (
          <CartItem
            key={item.id}
            title={item.title}
            image={item.image}
            quantity={item.quantity}
            price={item.price}
          />
        ))}

        <View style={styles.payment}>
          <View style={styles.content}>
            <Text style={[styles.titlePrice, { color: colors.primaryText }]}>
              Total Price
            </Text>
            <Text style={[styles.price, { color: colors.primaryText }]}>
              $16.98
            </Text>
          </View>
          <Button
            label="Buy"
            borderColor="#324A59"
            backgroundColor="#324A59"
            icon={
              <FeatherIcon
                name="shopping-cart"
                size={25}
                color="white"
                style={{ marginRight: 20 }}
              />
            }
            style={styles.button}
            onPress={toggleModal}
          />
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}>
        <OrderPayment toggleModal={toggleModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 10,
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  content: {
    flexDirection: 'column',
  },
  titlePrice: {
    marginBottom: 10,
    fontSize: 15,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 30,
  },
  button: {
    width: 180,
  },
  modal: {
    margin: 0,
    marginTop: 160,
  },
});

export default CartScreen;
