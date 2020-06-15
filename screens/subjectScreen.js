/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import {TextInput} from 'react-native-gesture-handler';
import SearchBar from '../components/searchBar';

const SubjectScreen = ({navigation}) => {
  const [subjects, setSubject] = useState([]);
  const SUBJECT_QUERY_URL = 'http://api.purdue.io/odata/Subjects';
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch(SUBJECT_QUERY_URL)
      .then(response => response.json())
      .then(json => {
        setSubject(json.value);
        setFiltered(json.value);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []); // passing an empty array to ensure useeffect only runs once

  const renderLoader = () => {
    if (loading) {
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
    const search = subjects.filter(item => {
      const formatSubject =
        item.Name.toString().toLowerCase() +
        ' ' +
        item.Abbreviation.toString().toLowerCase();
      return formatSubject.includes(formattedQuery);
    });

    setFiltered(search);
  };

  return (
    <View style={styles.container}>
      <SearchBar query={query} searchText={searchText} />
      <FlatList
        data={filtered}
        keyExtractor={({SubjectId}) => SubjectId}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Class', item)}>
            <Text style={styles.text}>
              {item.Name} ({item.Abbreviation})
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
    backgroundColor: '#ffe4b5',
    borderRadius: 50,
  },
  text: {
    fontFamily: 'cochin',
    fontWeight: 'normal',
    fontSize: 24,
  },
});

export default SubjectScreen;