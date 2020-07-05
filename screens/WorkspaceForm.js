import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment-timezone';
import {Picker} from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';

const WorkspaceForm = ({navigation}) => {
  const [duration, setDuration] = useState('');
  const [showClock, setClock] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [convertedTime, setConvertedTime] = useState('');
  const [originalTime, setOriginalTime] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const converted = moment(currentDate)
      .tz('America/New_York')
      .format('HH:mm');
    setConvertedTime(converted);
    const currentTime = moment(currentDate)
      .format('HH:mm')
      .toString();
    setOriginalTime(currentTime);
  };

  const addUserDetails = () => {
    const data = {
      title: title,
      subject: navigation.getParam('TitleSubject'),
      class: navigation.getParam('Number'),
      description: description,
      duration: duration,
      startTime: convertedTime,
      // location: location
    };
    firestore()
      .collection('sessions')
      .add(data)
      .then(() => {
        console.log('added details');
      });
  };

  return (
    <View style={styles.container}>
      <Text>
        {navigation.getParam('lat')} {navigation.getParam('long')}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Text>Select Location</Text>
      </TouchableOpacity>
      <Text style={styles.formLabel}>
        Subject : {navigation.getParam('TitleSubject')}
      </Text>
      <Text style={styles.formLabel}>
        Class : {navigation.getParam('Number')}
      </Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
        onFocus={() => {
          setShowDuration(false);
          setClock(false);
        }}
      />
      <TextInput
        placeholder="Additional info..."
        value={description}
        onChangeText={text => {
          setDescription(text);
        }}
        onFocus={() => {
          setShowDuration(false);
          setClock(false);
        }}
      />
      <TouchableOpacity onPress={() => addUserDetails()}>
        <Text>PRESS ME</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Choose starting time for session..."
        style={styles.inputStyle}
        value={originalTime}
        onFocus={() => {
          setShowDuration(false);
          setClock(true);
        }}
      />
      {showClock && (
        <DateTimePicker
          style={styles.spinner}
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      {/* <View style={styles.container}> */}
      <TextInput
        placeholder="Choose duration for session..."
        value={duration}
        style={styles.inputStyle}
        onFocus={() => {
          setClock(false);
          setShowDuration(true);
        }}
      />
      {showDuration && (
        <Picker
          selectedValue={duration}
          style={{height: 30, width: 300}}
          onValueChange={minutes => {
            if (minutes !== '---') {
              setDuration(minutes);
            } else {
              setDuration('');
            }
          }}>
          <Picker.Item label="---" value="---" />
          <Picker.Item label="30 minutes" value="30 minutes" />
          <Picker.Item label="1 hour" value="1 hour" />
          <Picker.Item label="2 hours" value="2 hours" />
          <Picker.Item label="3 hours" value="3 hours" />
        </Picker>
      )}
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
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
    justifyContent: 'center',
    paddingHorizontal: 0,

    height: 150,
    width: 200,
  },
});

export default WorkspaceForm;
