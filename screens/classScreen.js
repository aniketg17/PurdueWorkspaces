import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SearchBar from '../components/searchBar';
import 'react-native-gesture-handler';
import {sub} from 'react-native-reanimated';

const ClassScreen = ({navigation}) => {
  const [classes, setClasses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const SUBJECT_QUERY_URL =
    'http://api.purdue.io/odata/Courses?%24filter=Subject/Abbreviation%20eq%20%27' +
    navigation.getParam('Abbreviation') +
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
      return (
        <View style={styles.loader}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    } else {
      return null;
    }
  };

  const searchText = text => {
    setQuery(text);
    const formattedQuery = text.toLowerCase();
    const finder = classes.filter(item => {
      const formattedItem =
        navigation.getParam('Abbreviation').toLowerCase() +
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
              const subTitle = navigation.getParam('Abbreviation');
              const dataTransfer = {
                TitleSubject: subTitle,
                Number: item.Number,
              };
              console.log(
                navigation.getParam('Abbreviation') +
                  ' ' +
                  dataTransfer.TitleSubject +
                  ' ' +
                  dataTransfer.Number,
              );
              navigation.navigate('Workspace', dataTransfer);
            }}>
            <Text style={styles.text}>
              {navigation.getParam('Abbreviation')} {item.Number} ({item.Title})
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#f0fff0',
    fontSize: 24,
    borderRadius: 50,
  },
  loader: {
    paddingVertical: 20,
    borderColor: '#CED0CE',
  },
  text: {
    fontFamily: 'cochin',
    fontWeight: 'normal',
    fontSize: 24,
  },
});

export default ClassScreen;
