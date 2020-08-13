import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Content,
  Text,
  Header,
  Badge,
  Icon,
  Button,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

//import {Col, Row, Grid} from 'react-native-easy-grid';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item1}>
        <Text style={styles.text}>Item 1</Text>
      </View>
      <View style={styles.minicontainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.Button}>
            <Icon type="FontAwesome" name="check-circle" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  minicontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f8ff',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  item1: {
    flex: 3,
    backgroundColor: '#feffcb', // #f0f8ff
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 160,
  },
  Button: {
    backgroundColor: '#1e90ff',
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
    width: 100,
    paddingHorizontal: 37,
    borderRadius: 60,
  },
});

export default InfoScreen;

/*
<Button success>
        <Icon type="FontAwesome" name="check-circle" />
      </Button>
      */
