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

//import {Col, Row, Grid} from 'react-native-easy-grid';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item1}>
        <Text style={styles.text}>Item 1</Text>
      </View>
      <View style={styles.minicontainer}>
        <View style={styles.button2}>
          <Button rounded transparent success>
            <Icon type="FontAwesome" name="check-circle" />
          </Button>
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
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  item1: {
    flex: 3,
    backgroundColor: '#feffcb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 180,
    width: 1000,
  },
});

export default InfoScreen;

/*
<Button success>
        <Icon type="FontAwesome" name="check-circle" />
      </Button>
      */
