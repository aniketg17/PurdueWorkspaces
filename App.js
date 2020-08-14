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

import React from 'react';
import 'react-native-gesture-handler';
import Navigator from './routes/homeStack';
import {Root} from 'native-base';

const App = () => {
  return (
    <Root>
      <Navigator />
    </Root>
  );
};
export default App;
