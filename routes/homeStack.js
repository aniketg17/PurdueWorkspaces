import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Subject from '../screens/subjectScreen';
import Class from '../screens/classScreen';
import Workspace from '../screens/workspaceForm';
import Locations from '../screens/purdueLocations';
import Selection from '../screens/selectionScreen';

const screens = {
  Selection: {
    screen: Selection,
  },
  Subject: {
    screen: Subject,
  },
  Class: {
    screen: Class,
  },
  Workspace: {
    screen: Workspace,
  },
  Locations: {
    screen: Locations,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
