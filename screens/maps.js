import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Dimensions, View} from 'react-native';

const Maps = () => {
  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default Maps;
