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

const InfoScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Container style={styles.upperContainer}>
        <Content padder>
          <Card style={styles.card}>
            <CardItem header bordered>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase is a free and open source framework that enable
                  developers to build high-quality mobile apps using React
                  Native iOS and Android apps with a fusion of ES6. NativeBase
                  is a free and open source framework that enable developers to
                  build high-quality mobile apps using React Native iOS and
                  Android apps with a fusion of ES6. NativeBase is a free and
                  open source framework that enable developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps with a fusion of ES6. NativeBase is a free and open
                  source framework that enable developers to build high-quality
                  mobile apps using React Native iOS and Android apps with a
                  fusion of ES6.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>GeekyAnts</Text>
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
    flex: 2,
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
