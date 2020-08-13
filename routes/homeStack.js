import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Subjects from '../screens/subjectScreen';
import Class from '../screens/classScreen';
import WorkspaceForm from '../screens/workspaceForm';
import Locations from '../screens/purdueLocations';
import Selection from '../screens/selectionScreen';
import WorkspaceLoader from '../screens/workspaceLoader';
import InfoScreen from '../screens/workspaceInfoScreen';

const screens = {
  'Select an option': {
    screen: Selection,
  },
  'Select a subject': {
    screen: Subjects,
  },
  'Select a class': {
    screen: Class,
  },
  'Create a new workspace': {
    screen: WorkspaceForm,
  },
  'Select a location': {
    screen: Locations,
  },
  'Select a workspace': {
    screen: WorkspaceLoader,
  },
  'Workspace info': {
    screen: InfoScreen,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
