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
  Toast,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

/*
 * This screen shows the information of the selected workspace
 * and allows the user to join the given workspace. Upon, joining
 * the user is taken back to home screen and the count in the chosen
 * workspace is incremented in the backend.
 */

const InfoScreen = ({navigation}) => {
  var numPeople = navigation.getParam('numPeople');
  const id = navigation.getParam('id');
  const [peopleCountDisplay, setCount] = useState('-');
  const [updated, setFlag] = useState(false);

  useEffect(() => {
    firestore()
      .collection('sessions')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id === id) {
            setCount(documentSnapshot.data().numpeople);
          }
        });
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // passing an empty array to ensure useeffect only runs once

  const updateDatabase = () => {
    // updating database with incremented count
    firestore()
      .collection('sessions')
      .doc(id)
      .update({
        numpeople: numPeople + 1,
      })
      .then(() => {
        console.log(id + ' User updated!');
        if (!updated && numPeople == peopleCountDisplay) {
          setCount(peopleCountDisplay + 1);
          numPeople += 1;
        }
        setFlag(true);
      });
  };

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
                  {navigation.getParam('description') + '\n\n'}
                  <Text style={styles.boldWord}>Location: </Text>
                  {navigation.getParam('location') + '\n\n'}
                  <Text style={styles.boldWord}>Date: </Text>
                  {navigation.getParam('startDate') + '\n\n'}
                  <Text style={styles.boldWord}>Start time: </Text>
                  {navigation.getParam('startTime') + '\n\n'}
                  <Text style={styles.boldWord}>End time: </Text>
                  {navigation.getParam('endTime') + '\n\n'}
                  <Text style={styles.boldWord}>
                    Number of attendees currently:{' '}
                  </Text>
                  {peopleCountDisplay}
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              updateDatabase();
              Toast.show({
                type: 'success',
                text: 'Added you to the session!',
              });
              navigation.navigate('Select an option');
            }}>
            <Icon type="FontAwesome" name="check" />
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
    flex: 3,
    backgroundColor: '#f0f8ff',
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
