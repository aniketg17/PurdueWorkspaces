import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const workspaceLoader = ({navigation}) => {
  return (
    <View>
      <Text>
        {navigation.getParam('TitleSubject')} {navigation.getParam('Number')}
      </Text>
    </View>
  );
};

export default workspaceLoader;
