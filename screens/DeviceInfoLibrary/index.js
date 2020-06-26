"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const getMacAddress = getMacAddress;
export { _getMacAddress as getMacAddress };

const __default = void 0;
export { __default as default };


import { Platform, } from "react-native";


var _nativeInterface = _interopRequireDefault(require("./internal/nativeInterface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getMacAddress() {
  if (Platform.OS === 'android') {
    return _nativeInterface.default.getMacAddress();
  } else if (Platform.OS === 'ios') {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}


const deviceInfoModule = {
  getMacAddress
};
var _default = deviceInfoModule;
const __default = _default;
export { __default as default };
//# sourceMappingURL=index.js.map