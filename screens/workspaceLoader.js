import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const WorkspaceLoader = ({navigation}) => {
  const [returnedSubjects, setSubjects] = useState([]);

  useEffect(() => {
    const subject = navigation.getParam('TitleSubject');
    const classSelected = navigation.getParam('Number');
    firestore()
      .collection('sessions')
      .where('class', '==', classSelected.toString())
      .where('subject', '==', subject.toString())
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setSubjects(prevData => [...prevData, documentSnapshot.data()]);
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // passing an empty array to ensure useeffect only runs once

  return (
    <View>
      <Text>{returnedSubjects[0].numpeople}</Text>
    </View>
  );
};

export default WorkspaceLoader;
