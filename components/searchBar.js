import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const SearchBarFilter = ({query, searchText}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  searchbar: {
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 50,
    backgroundColor: '#FFFF',
  },
});

export default SearchBarFilter;
