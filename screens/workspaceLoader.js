import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/loadingCircle';

const WorkspaceLoader = ({navigation}) => {
  const [returnedSubjects, setSubjects] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const renderLoader = () => {
    if (!isLoaded) {
      return <Loader />;
    } else {
      if (returnedSubjects.length === 0) {
        return (
          <View>
            <Text style={styles.unavailableText}>Nothing here!</Text>
            <TouchableOpacity
              //style={styles.item}
              onPress={() => {
                const dataTransfer = {
                  TitleSubject: navigation.getParam('TitleSubject'),
                  Number: navigation.getParam('Number'),
                };
                navigation.navigate('WorkspaceForm', dataTransfer);
              }}>
              <Text style={styles.redirectButton}>Want to create one?</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return null;
    }
  };

  useEffect(() => {
    const abbreviation = navigation.getParam('TitleSubject');
    const classSelected = navigation.getParam('Number');
    firestore()
      .collection('sessions')
      .where('class', '==', classSelected.toString())
      .where('subject', '==', abbreviation.toString())
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setSubjects(prevData => [...prevData, documentSnapshot]);
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
        setLoaded(true);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // passing an empty array to ensure useeffect only runs once

  return (
    <View style={styles.container}>
      {/* <SearchBar query={query} searchText={searchText} /> */}
      <FlatList
        data={returnedSubjects}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate('Workspace info', item.data());
            }}>
            <Text style={styles.text}>
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
  text: {
    fontFamily: 'cochin',
    fontWeight: 'normal',
    fontSize: 24,
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
  redirectButton: {
    fontStyle: 'italic',
    fontSize: 24,
    paddingTop: 50,
    paddingHorizontal: 100,
    width: 1000,
    color: '#1e90ff',
  },
});

export default WorkspaceLoader;
