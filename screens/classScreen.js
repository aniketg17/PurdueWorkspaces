import React from 'react';
import {View, Text} from 'react-native';

const ClassScreen = ({navigation}) => {
  return (
    <View>
      <Text>{navigation.getParam('SubjectId')}</Text>
    </View>
  );
};

export default ClassScreen;
