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
import {pink} from 'color-name';
import {NavigationContainer} from '@react-navigation/native';

const SubjectScreen = props => {
  const [subjects, setSubject] = useState([]);
  const SUBJECT_QUERY_URL = 'http://api.purdue.io/odata/Subjects';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SUBJECT_QUERY_URL)
      .then(response => response.json())
      .then(json => setSubject(json.value))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  });

  const renderLoader = () => {
    if (!loading) {
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
        keyExtractor={({SubjectId}) => SubjectId}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => props.navigation.navigate('Class', item)}>
            <Text>
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
    backgroundColor: 'pink',
    fontSize: 24,
  },
});

export default SubjectScreen;
