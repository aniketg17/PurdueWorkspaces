import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';

const WorkspaceForm = ({navigation}) => {
  const [time, setTime] = useState(0);

  return (
    <View style={styles.container}>
      <View>
        <TextInput placeholder="Email" /*style={styles.inputStyle}*/ />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          //style={styles.inputStyle}
        />
        <Picker
          selectedValue={time}
          style={{height: 50, width: 300}}
          onValueChange={time => setTime(time)}>
          <Picker.Item label="30 minutes" value="java" />
          <Picker.Item label="1 hour" value="js" />
          <Picker.Item label="2 hours" value="js" />
          <Picker.Item label="3 hours" value="js" />
          <Picker.Item label="Custom" value="js" />
        </Picker>
      </View>
    </View>
    // <View>
    //   <Text>
    //     {navigation.getParam('TitleSubject')} {navigation.getParam('Number')}
    //   </Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    //justifyContent: 'center',
  },

  formLabel: {
    fontSize: 20,
    color: '#000000',
    marginTop: 0,
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#fff5ee',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  text: {
    color: '#000000',
    fontSize: 20,
  },
});

export default WorkspaceForm;
