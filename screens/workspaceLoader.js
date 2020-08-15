import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/loadingCircle';
import moment from 'moment';

const WorkspaceLoader = ({navigation}) => {
  const [returnedSubjects, setSubjects] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const renderLoader = () => {
    if (!isLoaded) {
      return <Loader />;
    } else {
      if (returnedSubjects.length === 0) {
        return (
          <View style={styles.unavailableContainer}>
            <Text style={styles.unavailableText}>Nothing here!</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  const dataTransfer = {
                    TitleSubject: navigation.getParam('TitleSubject'),
                    Number: navigation.getParam('Number'),
                    description: 'Select a location',
                  };
                  navigation.navigate('Create a new workspace', dataTransfer);
                }}>
                <Text style={styles.basicText}>Want to create one?</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      return null;
    }
  };

  useEffect(() => {
    const abbreviation = navigation.getParam('TitleSubject');
    const classSelected = navigation.getParam('Number');
    // current time normalization
    const presentDate = moment()
      .tz('America/New_York')
      .toDate();
    firestore()
      .collection('sessions')
      .where('class', '==', classSelected.toString())
      .where('subject', '==', abbreviation.toString())
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const endTime = documentSnapshot.data().endTime;
          const endDate = documentSnapshot.data().endDate;
          const sessionYear = endDate.substr(6, 4);
          const sessionMonth = endDate.substr(0, 2);
          const sessionDate = endDate.substr(3, 2);
          const sessionHour = endTime.substr(0, 2);
          const sessionMinute = endTime.substr(3, 2);

          console.log(
            sessionMonth +
              '/' +
              sessionDate +
              '/' +
              sessionYear +
              ' ' +
              sessionHour +
              ':' +
              sessionMinute +
              ':' +
              '00',
          );
          console.log('current date: ' + presentDate.toString());

          var sessionCurrentDate = new Date(
            sessionYear,
            sessionMonth - 1,
            sessionDate,
            sessionHour,
            sessionMinute,
            0,
            0,
          );
          // session time normalization
          sessionCurrentDate = moment()
            .tz('America/New_York')
            .toDate();
          console.log('session: ' + sessionCurrentDate.toString());

          if (sessionCurrentDate.getTime() < presentDate.getTime()) {
            console.log(
              'deleted: ',
              documentSnapshot.id,
              documentSnapshot.data(),
            );
            // deletion of the relevant document from database
            firestore()
              .collection('sessions')
              .doc(documentSnapshot.id)
              .delete()
              .then(() => {
                console.log('User deleted!');
              });
          } else {
            // adding data to the list for rendering
            setSubjects(prevData => [...prevData, documentSnapshot]);
            console.log(
              'User ID: ',
              documentSnapshot.id,
              documentSnapshot.data(),
            );
          }
        });
        setLoaded(true);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // passing an empty array to ensure useeffect only runs once

  return (
    <View style={styles.container}>
      <FlatList
        data={returnedSubjects}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              const dataTransfer = {
                title: item.data().title.toString(),
                location: item.data().location.toString(),
                description: item.data().workspaceDescription.toString(),
                startTime: item.data().startTime,
                endTime: item.data().endTime,
                numPeople: item.data().numpeople,
                class: item.data().class,
                startDate: item.data().startDate,
                subject: item.data().subject,
                id: item.id,
              };
              navigation.navigate('Workspace info', dataTransfer);
            }}>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Title: </Text>
              {item.data().title.toString()}
              {'\n'}
              <Text style={styles.label}>Location: </Text>
              {item.data().location.toString()}
              {'\n'}
              <Text style={styles.label}>Start Time: </Text>
              {item.data().startTime.toString()}
              {'\n'}
              <Text style={styles.label}>Duration: </Text>
              {item.data().duration.toString()}
            </Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={renderLoader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#ffe4b5',
    borderRadius: 50,
  },
  infoText: {
    fontWeight: 'normal',
    fontSize: 24,
    fontFamily: 'cochin',
  },
  basicText: {
    fontWeight: 'normal',
    fontSize: 24,
    fontFamily: 'cochin',
    textAlign: 'center',
  },
  label: {
    fontFamily: 'cochin',
    fontWeight: '900',
    fontSize: 24,
    fontStyle: 'normal',
  },
  unavailableText: {
    fontStyle: 'italic',
    fontSize: 24,
    paddingTop: 50,
    paddingHorizontal: 100,
    width: 1000,
  },

  button: {
    backgroundColor: '#1e90ff',
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
    width: 'auto',
    borderRadius: 50,
    textAlign: 'center',
  },
  unavailableContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 40,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignContent: 'center',
    paddingHorizontal: 80,
    paddingTop: 40,
    marginBottom: 36,
  },
});

export default WorkspaceLoader;
