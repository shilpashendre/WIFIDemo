/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import LibraryFunction from './screens/LibraryFunction';
import NetInfoeDevice from './NetPackage/NetLib';


export { LibraryFunction, NetInfoeDevice };

AppRegistry.registerComponent(appName, () => App);