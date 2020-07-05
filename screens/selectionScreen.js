import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const selections = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          const selectedRoute = {
            route: 'new',
          };
          navigation.navigate('Subject', selectedRoute);
        }}>
        <Text style={styles.text}> Create a New Workspace</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          const selectedRoute = {
            route: 'existing',
          };
          navigation.navigate('Subject', selectedRoute);
        }}>
        <Text style={styles.text}>Join an Existing Workspace</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#f0fff0',
    fontSize: 24,
    borderRadius: 50,
  },
  text: {
    fontFamily: 'cochin',
    fontWeight: 'normal',
    fontSize: 24,
  },
});

export default selections;
