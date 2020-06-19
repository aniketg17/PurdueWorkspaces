import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

const WorkspaceForm = ({navigation}) => {
  return (
    <View>
      <Text>
        {navigation.getParam('TitleSubject')} {navigation.getParam('Number')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

export default WorkspaceForm;
