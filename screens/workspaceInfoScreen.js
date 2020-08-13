import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Body,
  Container,
  Content,
  Icon,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

//import {Col, Row, Grid} from 'react-native-easy-grid';

const InfoScreen = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <Container style={styles.upperContainer}>
        <Content padder>
          <Card style={styles.card}>
            <CardItem header bordered>
              <Text>{navigation.getParam('title').toString()}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  <Text style={styles.boldWord}>Class: </Text>
                  {navigation.getParam('subject') +
                    ' ' +
                    navigation.getParam('class') +
                    '\n\n'}
                  <Text style={styles.boldWord}>Description: </Text>
                  {navigation.getParam('workspaceDescription') + '\n\n'}
                  <Text style={styles.boldWord}>Location: </Text>
                  {navigation.getParam('location') + '\n\n'}
                  <Text style={styles.boldWord}>Start time: </Text>
                  {navigation.getParam('startTime') + '\n\n'}
                  <Text style={styles.boldWord}>End time: </Text>
                  {navigation.getParam('endTime') + '\n\n'}
                  <Text style={styles.boldWord}>
                    Number of attendees currently:{' '}
                  </Text>
                  {navigation.getParam('numpeople')}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>Click on the button below to join</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
      <View style={styles.miniContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon type="FontAwesome" name="check-circle" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boldWord: {
    fontFamily: 'cochin',
    fontWeight: '900',
    fontSize: 24,
    fontStyle: 'normal',
  },
  miniContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f8ff',
  },
  card: {
    width: 300,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  upperContainer: {
    flex: 4,
    backgroundColor: '#f0f8ff', // #feffcb
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 160,
  },
  button: {
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
