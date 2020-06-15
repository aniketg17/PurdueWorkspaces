import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Subject from '../screens/subjectScreen';
import Class from '../screens/classScreen';
import Workspace from '../screens/newWorkspaceForm';

const screens = {
  Subject: {
    screen: Subject,
  },
  Class: {
    screen: Class,
  },
  Workspace: {
    screen: Workspace,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
