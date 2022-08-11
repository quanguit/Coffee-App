import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { SCREEN_MARGIN_HORIZONTAL } from '../../configs/App';
import CartItem from './components/CartItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import OrderPayment from './components/OrderPayment';
import Modal from 'react-native-modal';
import { useTheme } from '../../context/Theme';
import { useItem } from '../../context/Item';
import { totalPrice } from '../../context/Item/item.utils';

const CartScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { items } = useItem();
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
      {items.length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map(item => (
            <CartItem
              key={`${item.id}+${item.size}`}
              id={item.id}
              title={item.name}
              image={item.imageUrl}
              quantity={item.quantity}
              price={item.price}
              size={item.size}
            />
          ))}
          <View style={styles.payment}>
            <View style={styles.content}>
              <Text style={[styles.titlePrice, { color: colors.primaryText }]}>
                Total Price
              </Text>
              <Text style={[styles.price, { color: colors.primaryText }]}>
                $ {totalPrice(items)}
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
      ) : (
        <Text style={[styles.title, { color: colors.primaryText }]}>
          You haven't ordered anything!
        </Text>
      )}
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
  modal: {
    margin: 0,
    marginTop: 160,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default CartScreen;
