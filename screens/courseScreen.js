import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import SearchBar from '../components/searchBar';
import 'react-native-gesture-handler';
import Loader from '../components/loadingCircle';

/*
 * This screen renders the course list from Purdue's course
 * catalog API. Depending on the initial choice, the user
 * is taken to either create a new workspace or join an existing
 * one.
 */

const ClassScreen = ({navigation}) => {
  const [classes, setClasses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const itemData = navigation.getParam('item'); // item object passed in from previous screen
  const SUBJECT_QUERY_URL =
    'http://api.purdue.io/odata/Courses?%24filter=Subject/Abbreviation%20eq%20%27' +
    itemData.Abbreviation +
    '%27&%24orderby=Number%20asc';
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch(SUBJECT_QUERY_URL)
      .then(response => response.json())
      .then(json => {
        setClasses(json.value);
        setFilteredData(json.value);
      })
      .catch(error => console.error(error))
      .finally(() => setLoaded(true));
  }, [SUBJECT_QUERY_URL]);

  const renderLoader = () => {
    if (!loaded) {
      return <Loader />;
    } else {
      return null;
    }
  };

  const searchText = text => {
    setQuery(text);
    const formattedQuery = text.toLowerCase();
    const finder = classes.filter(item => {
      const formattedItem =
        itemData.Abbreviation.toLowerCase() +
        item.Title.toString().toLowerCase() +
        item.Number.toString().toLowerCase();
      return formattedItem.includes(formattedQuery);
    });

    setFilteredData(finder);
  };

  return (
    <View style={styles.container}>
      <SearchBar query={query} searchText={searchText} />
      <FlatList
        data={filteredData}
        keyExtractor={({CourseId}) => CourseId}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              if (navigation.getParam('route') === 'new') {
                const dataTransfer = {
                  TitleSubject: itemData.Abbreviation,
                  Number: item.Number,
                  description: 'Select Location',
                };
                navigation.navigate('Create a new workspace', dataTransfer);
              } else {
                const dataTransfer = {
                  TitleSubject: itemData.Abbreviation,
                  Number: item.Number,
                };
                navigation.navigate('Select a workspace', dataTransfer);
              }
            }}>
            <Text style={styles.text}>
              {itemData.Abbreviation.toString()} {item.Number} ({item.Title})
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
    fontSize: 24,
    borderRadius: 50,
  },
  text: {
    fontFamily: 'cochin',
    fontWeight: 'normal',
    fontSize: 24,
  },
});

export default ClassScreen;
