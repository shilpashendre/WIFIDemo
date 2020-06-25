import LocationError from '../Error/LocationErr';

import {
    NativeModules, Platform, Linking,
    PermissionsAndroid,
} from 'react-native';

const { ReactNativeGetLocation } = NativeModules;


async function requestAndroidPermission(enableHighAccuracy = false) {
    const { PERMISSIONS, RESULTS } = PermissionsAndroid;
    const granted = await PermissionsAndroid.request(enableHighAccuracy
        ? PERMISSIONS.ACCESS_FINE_LOCATION
        : PERMISSIONS.ACCESS_COARSE_LOCATION);
    if (granted !== RESULTS.GRANTED) {
        throw new LocationError('UNAUTHORIZED', 'Authorization denied');
    }
    return true;
}

export default {
    async getCurrentPosition(options = {
        enableHighAccuracy: false,
        timeout: 0,
    }) {
        if (Platform.OS === 'android') {
            await requestAndroidPermission(options.enableHighAccuracy);
        }
        try {
            const location = await ReactNativeGetLocation.getCurrentPosition(options);
            return location;
        } catch (error) {
            const { code, message } = error;
            const locationError = new LocationError(code, message);
            locationError.stack = error.stack;
            throw locationError;
        }
    },
}