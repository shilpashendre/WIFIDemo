/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
/**
 * @providesModule AndroidWifiModule
 */
 

import { NativeModules } from 'react-native';
module.exports = NativeModules.AndroidWifiModule;


AppRegistry.registerComponent(appName, () => App);
