import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

/*
 * This screen is where the user reaches upon initialization
 * of the app. Here, the user makes the choice
 * between joining an existing workspace or creating a new one.
 */

const selections = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          const selectedRoute = {
            route: 'new',
          };
          navigation.navigate('Select a subject', selectedRoute);
        }}>
        <Text style={styles.text}> Create a New Workspace</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          const selectedRoute = {
            route: 'existing',
          };
          navigation.navigate('Select a subject', selectedRoute);
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
    backgroundColor: '#ffe4b5',
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
