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
  Content,
  Form,
  Item,
  Input,
  Toast,
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
    const formattedD = moment(currentDate)
      .tz('America/New_York')
      .format('MM-DD-YYYY'); // date to be stored
    setFormattedDate(formattedD);
  };

  const addUserDetails = () => {
    const locationDescrip = navigation.getParam('description');
    var durationInteger = duration.split(' ');
    durationInteger = parseInt(durationInteger[0]);
    console.log(durationInteger);
    if (durationInteger === 30) {
      durationInteger = 0.5;
    }
    const endMoment = moment(date).add(durationInteger, 'hours');
    const endTime = endMoment.tz('America/New_York').format('HH:mm');
    const endDate = endMoment.tz('America/New_York').format('MM-DD-YYYY');
    const data = {
      title: title,
      subject: navigation.getParam('TitleSubject'),
      class: navigation.getParam('Number'),
      workspaceDescription: description,
      duration: duration,
      startTime: convertedTime,
      latitude: navigation.getParam('lat'),
      longitude: navigation.getParam('long'),
      location: locationDescrip,
      numpeople: 1,
      startDate: formattedDate,
      endTime: endTime,
      endDate: endDate,
    };
    firestore()
      .collection('sessions')
      .add(data)
      .then(() => {
        console.log('added details');
      });
  };

  const validateInput = () => {
    var durationInteger = duration.split(' ');
    durationInteger = parseInt(durationInteger[0]);
    console.log(durationInteger);
    if (durationInteger === 30) {
      durationInteger = 0.5;
    }
    const endMoment = moment(date).add(durationInteger, 'hours');
    const endSessionDateTime = endMoment.tz('America/New_York').toDate();
    const currentDateTime = moment()
      .tz('America/New_York')
      .toDate();

    if (
      navigation.getParam('TitleSubject') === undefined ||
      navigation.getParam('Number') === undefined ||
      navigation.getParam('lat') === undefined ||
      navigation.getParam('long') === undefined ||
      navigation.getParam('description') === undefined ||
      title === '' ||
      description === '' ||
      duration === '' ||
      convertedTime === ''
    ) {
      Toast.show({
        type: 'danger',
        text: 'Please fill all the information!',
      });
    } else if (endSessionDateTime.getTime() < currentDateTime.getTime()) {
      Toast.show({
        type: 'danger',
        text: 'Please choose the correct time!',
      });
    } else {
      addUserDetails();
      Toast.show({
        type: 'success',
        text: 'Created the session!',
      });
      navigation.navigate('Select an option');
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
          <View style={styles.upperContainer}>
            <Item>
              <Input
                onChangeText={text => setTitle(text)}
                onFocus={() => hidePickers()}
                placeholder="Enter title for workspace"
              />
              <Icon type="FontAwesome5" name="heading" />
            </Item>
            <Form>
              <Textarea
                onChangeText={text => setDescription(text)}
                onFocus={() => hidePickers()}
                rowSpan={5}
                style={{marginTop: 40}}
                bordered
                placeholder="Enter description for workspace"
              />
            </Form>
          </View>

          <View style={styles.middleContainer}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate('Select a location');
                  hidePickers();
                }}>
                <Text style={styles.locationText}>
                  {navigation.getParam('description')}
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
                  itemStyle={{height: 150}}
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
                  <Picker.Item label="30 minutes" value="30 minutes" />
                  <Picker.Item label="1 hour" value="1 hour" />
                  <Picker.Item label="2 hours" value="2 hours" />
                  <Picker.Item label="3 hours" value="3 hours" />
                </Picker>
              )}
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.submitContainer}>
              <TouchableOpacity
                style={styles.submit}
                onPress={() => {
                  validateInput();
                }}>
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
    flex: 3,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitContainer: {
    justifyContent: 'flex-end',
    alignContent: 'center',
    paddingHorizontal: 150,
    paddingTop: 40,
    marginBottom: 36,
  },
  upperContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#f0f8ff',
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
  middleContainer: {
    flex: 1,
    marginTop: 35,
    backgroundColor: '#f0f8ff',
    height: 340,
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
    marginHorizontal: 50,
    height: 120,
    width: 200,
  },
});

export default WorkspaceForm;
