import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';
import { BANNER_COUPON } from '../../../assets';
import {
  DEFAULT_SHADOW_SETTINGS,
  SCREEN_MARGIN_HORIZONTAL,
} from '../../../configs/App';

const AdvertisementSection = () => {
  return (
    <View>
      <Text style={styles.heading}>Special Offer!</Text>
      <View style={styles.bannerContainer}>
        <ShadowView style={styles.shadow}>
          <TouchableOpacity
            onPress={() => console.log('ye')}
            style={{ padding: 15 }}>
            <Image source={BANNER_COUPON} style={styles.banner} />
          </TouchableOpacity>
        </ShadowView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    ...DEFAULT_SHADOW_SETTINGS,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
    marginBottom: 10,
    marginTop: 20,
  },
  bannerContainer: {
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },
  banner: {
    width: '100%',
    borderRadius: 20,
  },
});

export default AdvertisementSection;
