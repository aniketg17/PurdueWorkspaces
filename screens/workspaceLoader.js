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
              //const subTitle = itemData.Abbreviation;
              const dataTransfer = {
                //TitleSubject: subTitle,
                //Number: item.Number,
              };
            }}>
            <Text style={styles.text}>
              Title: {item.data().title.toString()}
              {'\n'}
              {'\n'}
              Location: {item.data().location.toString()}
              {'\n'}
              {'\n'}
              Start Time: {item.data().startTime.toString()}
              {'\n'}
              {'\n'}
              Duration: {item.data().duration.toString()}
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
});

export default WorkspaceLoader;
