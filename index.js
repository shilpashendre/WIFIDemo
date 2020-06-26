/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import NetInfoeDevice from './NetPackage/NetLib';


export { NetInfoeDevice };

AppRegistry.registerComponent(appName, () => App);