/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ListView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {pink} from 'color-name';

const App = () => {
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

  const getSubjectList = param => {
    console.log(param.item.Name);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={subjects}
        keyExtractor={({SubjectId}) => SubjectId}
        renderItem={param => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => getSubjectList(param)}>
            <Text>
              {param.item.Name} ({param.item.Abbreviation})
            </Text>
          </TouchableOpacity>
        )}
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

export default App;
