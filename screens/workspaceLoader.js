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
  const subject = navigation.getParam('TitleSubject');
  const classSelected = navigation.getParam('Number');

  var classes = firestore()
    .collection('sessions')
    .where('class', '==', classSelected.toString())
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });

  return (
    <View>
      <Text>{classes.toString()}</Text>
    </View>
  );
};

export default workspaceLoader;
