import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimePicker from 'react-native-simple-time-picker';
import {Picker} from '@react-native-community/picker';

const WorkspaceForm = ({navigation}) => {
  const [time, setTime] = useState({
    selectedHours: 0,
    selectedMinutes: 0,
  });
  const [minutes, setMinutes] = useState(0);

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View>
      <Text style={styles.formLabel}>
        Subject : {navigation.getParam('TitleSubject')}
      </Text>
      <Text style={styles.formLabel}>
        Class : {navigation.getParam('Number')}
      </Text>
      <Text>Select start time</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />

      <View style={styles.container}>
        <Picker
          selectedValue={minutes}
          style={{height: 50, width: 300}}
          onValueChange={minutes => setMinutes(minutes)}>
          <Picker.Item label="30 minutes" value={30} />
          <Picker.Item label="1 hour" value={60} />
          <Picker.Item label="2 hours" value={120} />
          <Picker.Item label="3 hours" value={180} />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
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
  spinner: {
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,

    height: 50,
    width: 200,
  },
});

export default WorkspaceForm;

// for dual time spinner
{
  /* <TimePicker
        selectedHours={time.selectedHours}
        selectedMinutes={time.selectedMinutes}
        onChange={(hours, minutes) =>
          setTime({
            selectedHours: hours,
            selectedMinutes: minutes,
          })
        }
      /> */
}
