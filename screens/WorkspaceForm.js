import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
  Icon,
  Textarea,
} from 'native-base';
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
  const [formattedDate, setFormattedDate] = useState('');
  const [locationPlaceholder, setLocation] = useState('Select Location');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const converted = moment(currentDate)
      .tz('America/New_York')
      .format('HH:mm'); // date to be used in firestore in EST
    setConvertedTime(converted);
    const currentTime = moment(currentDate)
      .format('hh:mm A')
      .toString(); // date to be displayed in scrollview
    setOriginalTime(currentTime);
    const formattedD = moment(currentDate).format('MM-DD-YYYY'); // date to be stored
    setFormattedDate(formattedD);
  };

  const addUserDetails = () => {
    const locationDescrip = navigation.getParam('descrip');
    const index = locationDescrip.indexOf(
      ',',
      locationDescrip.indexOf(',') + 1,
    );
    var durationInteger = duration.split(' ');
    durationInteger = parseInt(durationInteger[0]);
    const substringTillStreet = locationDescrip.slice(0, index);
    console.log(durationInteger);
    const endMoment = moment(date).add(durationInteger, 'hours');
    const end = endMoment.tz('America/New_York').format('HH:mm');
    const endDate = endMoment.format('MM-DD-YYYY');
    const data = {
      title: title,
      subject: navigation.getParam('TitleSubject'),
      class: navigation.getParam('Number'),
      workspaceDescription: description,
      duration: duration,
      startTime: convertedTime,
      latitude: navigation.getParam('lat'),
      longitude: navigation.getParam('long'),
      location: substringTillStreet,
      numpeople: 1,
      startDate: formattedDate,
      endTime: end,
      endDate: endDate,
    };
    firestore()
      .collection('sessions')
      .add(data)
      .then(() => {
        console.log('added details');
      });
  };

  const validateInput = () => {
    if (
      navigation.getParam('TitleSubject') === undefined ||
      navigation.getParam('Number') === undefined ||
      navigation.getParam('lat') === undefined ||
      navigation.getParam('long') === undefined ||
      navigation.getParam('descrip') === undefined ||
      title === '' ||
      description === '' ||
      duration === '' ||
      convertedTime === ''
    ) {
      alert('Please fill all the fields');
    } else {
      addUserDetails();
      navigation.navigate('Select a course');
    }
  };

  const hidePickers = () => {
    setClock(false);
    setShowDuration(false);
  };

  return (
    <Container style={styles.container}>
      <Content padder>
        <Form>
          <Item>
            {/*error */}
            <Input
              onChangeText={text => setTitle(text)}
              onFocus={() => hidePickers()}
              placeholder="Enter title for workspace"
            />
            <Icon type="FontAwesome5" name="heading" />
          </Item>
          <Text>{'\n'}</Text>
          <Form>
            <Textarea
              onChangeText={text => setDescription(text)}
              onFocus={() => hidePickers()}
              rowSpan={5}
              bordered
              placeholder="Enter description for workspace"
            />
          </Form>
          <Text>{'\n'}</Text>
          <View style={styles.bottomContainer}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate('Select a location');
                  hidePickers();
                }}>
                <Text style={styles.locationText}>
                  {navigation.getParam('descrip')}
                </Text>
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
                  style={styles.timeSpinner}
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              <TextInput
                placeholder="Choose duration for session..."
                value={duration}
                style={styles.inputStyle}
                on
                onFocus={() => {
                  setClock(false);
                  setShowDuration(true);
                }}
              />
              {showDuration && (
                <Picker
                  selectedValue={duration}
                  style={styles.durationSpinner}
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
            <View style={styles.submitContainer}>
              <TouchableOpacity
                style={styles.submit}
                onPress={() => validateInput()}>
                <Icon type="FontAwesome" name="check" />
              </TouchableOpacity>
            </View>
          </View>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 150,
    paddingTop: 150,
  },
  submit: {
    backgroundColor: '#1e90ff',
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
    width: 100,
    paddingHorizontal: 37,
    borderRadius: 60,
  },
  formLabel: {
    fontSize: 20,
    color: '#000000',
    marginTop: 0,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 45,
  },
  pickerContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 95,
  },
  button: {
    backgroundColor: '#1e90ff',
    height: 'auto',
    minHeight: 50,
    justifyContent: 'center',
    alignContent: 'center',
    width: 'auto',
    minWidth: 300,
    paddingHorizontal: 37,
    borderRadius: 40,
  },
  inputStyle: {
    marginTop: 20,
    width: 'auto',
    minWidth: 100,
    height: 'auto',
    minHeight: 50,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 0.5,
    backgroundColor: '#fff5ee',
    textAlign: 'center',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  locationText: {
    textAlign: 'center',
    fontFamily: 'cochin',
    fontSize: 18,
  },
  text: {
    color: '#000000',
    fontSize: 20,
  },
  timeSpinner: {
    marginHorizontal: 50,
    height: 120,
    width: 200,
  },
  durationSpinner: {
    marginTop: -20,
    marginHorizontal: 50,
    height: 120,
    width: 200,
  },
});

export default WorkspaceForm;

/*
<View style={styles.container}>
      <Text>{navigation.getParam('descrip')}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Select a location')}>
        <Text>{locationPlaceholder}</Text>
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
      <TouchableOpacity onPress={() => validateInput()}>
        <Text>Submit information</Text>
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
*/
