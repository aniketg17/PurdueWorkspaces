import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator animating size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    paddingVertical: 20,
    borderColor: '#CED0CE',
  },
});

export default Loader;
