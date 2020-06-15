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

const SubjectScreen = props => {
  const [subjects, setSubject] = useState([]);
  const SUBJECT_QUERY_URL = 'http://api.purdue.io/odata/Subjects';
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(SUBJECT_QUERY_URL)
      .then(response => response.json())
      .then(json => {
        setSubject(json.value);
        //setHaystack(json.value);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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
    //subjects.
    setSubject([
      {Name: 'Aniket', Abbreviation: 'Gup'},
      {Name: 'Gupta', Abbreviation: 'KS'},
    ]);
    // setQuery(text);
    // console.log(text);
    // const formattedQuery = text.toLowerCase();
    // const search = subjects.filter(subject => {
    //   const formatSubject = subject.Name.toString().toLowerCase();
    //   console.log(formatSubject.includes(formattedQuery));
    //   return formatSubject.includes(formattedQuery);
    // });

    // //console.log(needle);
    // if (search == true) {
    //   console.log(true);
    //   setSubject(needle);
    // } else {
    //   console.log('FALSE');
    // }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.searchbar}
          value={query}
          autoCapitalize="words"
          placeholder="Search..."
          autoCorrect={false}
          onChangeText={word => searchText(word)}
        />
      </View>
      <FlatList
        extraData={subjects}
        data={subjects}
        keyExtractor={({SubjectId}) => SubjectId}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => props.navigation.navigate('Class', item)}>
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
  searchbar: {
    borderRadius: 40,
    height: 50,
    width: 350,
    alignContent: 'center',
    backgroundColor: 'grey',
  },
});

export default SubjectScreen;
