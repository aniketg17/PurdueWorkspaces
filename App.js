/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ListView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import Subject from './screens/subjectScreen';

const App = () => {
  return <Subject />;
};
export default App;
