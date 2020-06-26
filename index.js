/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import LibraryFunction from './screens/LibraryFunction';
import NetInfoeDevice from './NetPackage/NetLib';
import DeviceFunction from './screens/DeviceInfoLibrary/DeviceFunction';
/**
 * @providesModule AndroidWifiModule
 */

import { NativeModules } from 'react-native';
module.exports = NativeModules.AndroidWifiModule;
export { LibraryFunction, NetInfoeDevice, DeviceFunction };

AppRegistry.registerComponent(appName, () => App);
