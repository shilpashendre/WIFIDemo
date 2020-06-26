import { Platform } from 'react-native';
import RNDeviceInfo from './internal/nativeInterface';

export default {
  async getMacAddress() {
    if (Platform.OS === 'android') {
      return RNDeviceInfo.getMacAddress();
    } else if (Platform.OS === 'ios') {
      return '02:00:00:00:00:00';
    }
    return 'unknown';
  }
}



