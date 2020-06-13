import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  List,
  ActivityIndicator,
} from 'react-native';

const ClassScreen = ({navigation}) => {
  const [subjects, setSubject] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const SUBJECT_QUERY_URL =
    'http://api.purdue.io/odata/Courses?%24filter=Subject/Abbreviation%20eq%20%27' +
    navigation.getParam('Abbreviation') +
    '%27&%24orderby=Number%20asc';

  useEffect(() => {
    fetch(SUBJECT_QUERY_URL)
      .then(response => response.json())
      .then(json => setSubject(json.value))
      .catch(error => console.error(error))
      .finally(() => setLoaded(true));
  });

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

  return (
    <View style={styles.container}>
      <FlatList
        data={subjects}
        keyExtractor={({CourseId}) => CourseId}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item}>
            <Text>
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
    backgroundColor: 'pink',
    fontSize: 24,
  },
  loader: {
    paddingVertical: 20,
    borderColor: '#CED0CE',
  },
});

export default ClassScreen;
