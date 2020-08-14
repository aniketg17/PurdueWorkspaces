import React, {useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import {v4 as uuid} from 'uuid';

const KEY = 'AIzaSyBEk2cllJeg-VgSQbYMPmHHfceBtJ6Aa0o';

const GooglePlacesInput = ({navigation}) => {
  const [id, setID] = useState(uuid());
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={4} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        const location = {
          description: data.description,
          lat: details.geometry.location.lat,
          long: details.geometry.location.lng,
        };
        navigation.navigate('Create a new workspace', location);
      }}
      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        sessiontoken: id, // to prevent billing for each SKU
        location: '40.4237, -86.9212', // latlong of purdue university, west lafayette
        radius: '5000',
        key: KEY,
        language: 'en', // language of the results
        strictbounds: true,
        components: 'country:us',
        types: 'establishment', // to restrict location rendering down to establishments within cities
      }}
      styles={{
        textInputContainer: {
          width: '100%',
        },
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={
        {
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        }
      }
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'geometry,name', // to get the latlong of selected location
      }}
      filterReverseGeocodingByTypes={[
        // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // available options : https://developers.google.com/maps/documentation/geocoding/intro#Types
        'street_address',
        'premise',
      ]}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
};

export default GooglePlacesInput;
