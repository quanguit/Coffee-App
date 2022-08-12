import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Color from 'color';
import { useApp, useTheme } from '../context';

const AppLoading = () => {
  const { appLoading } = useApp();
  const { colors } = useTheme();

  if (!appLoading) {
    return null;
  } else {
    return (
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: Color(colors.backgroundColorSpinner)
              .darken(1)
              .alpha(0.6)
              .rgb()
              .toString(),
          },
        ]}>
        <ActivityIndicator color={colors.textOnColoredSurface} size="large" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppLoading;
