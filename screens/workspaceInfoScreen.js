import React, {useState, useEffect} from 'react';

import {
  Container,
  Content,
  Text,
  Header,
  Badge,
  Icon,
  Button,
} from 'native-base';

import {Col, Row, Grid} from 'react-native-easy-grid';

const InfoScreen = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Icon type="FontAwesome" name="twitter" />
      </Content>
    </Container>
  );
};

export default InfoScreen;
