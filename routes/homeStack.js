import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Subject from '../screens/subjectScreen';
import Class from '../screens/classScreen';
import WorkspaceForm from '../screens/workspaceForm';
import Locations from '../screens/purdueLocations';
import Selection from '../screens/selectionScreen';
import WorkspaceLoader from '../screens/workspaceLoader';

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
  WorkspaceForm: {
    screen: WorkspaceForm,
  },
  Locations: {
    screen: Locations,
  },
  WorkspaceLoader: {
    screen: WorkspaceLoader,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
