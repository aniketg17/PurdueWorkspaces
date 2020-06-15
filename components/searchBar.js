import React from 'react';
import {TextInput, View} from 'react-native';

const SearchBar = ({conductSearch}) => {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        placeholder="Search eg. CS 180..."
        onChangeText={() => conductSearch()}
      />
    </View>
  );
};

export default SearchBar;
